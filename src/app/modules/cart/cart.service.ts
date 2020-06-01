import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';
import { addItemToCartAction, addItemsToCartAction, updateItemInCartAction, deleteItemInCartAction } from './store/cart.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../main/store/app.reducer';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';
import { CartItem } from 'src/app/models/cartItem';
import { tap, map, take } from 'rxjs/operators';
import { AlertService } from '../shared/alert/alert.service';
import { CART_ITEM_EXIST, CART_ITEM_MAX_QUANTITY } from 'src/app/helpers/constants';
import { updateProductAction } from '../shop/store/shop.actions';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private store: Store<AppState>,
    private fbDataService: FireStoreDbService,
    private alertService: AlertService
  ) {

    this.dispatchCartItemsToStore();
  }


  addItem(item: CartItem) {

    this.getCartFromStore()
      .pipe(take(1))
      .subscribe(cart => {
        console.log('saveItem to cart called', cart);

        const matchedItem = this.searchItem(cart, item);
        if (!!matchedItem) {
          console.log('updating the existing item');
          const updatedQuantity = matchedItem.SelectedQuantity + item.SelectedQuantity;
          if (updatedQuantity > item.Product.Quantity) {
            this.alertService.open({
              message: CART_ITEM_MAX_QUANTITY,
              controls: { cancel: { visible: false } }
            });
          } else {
            this.alertService.open({
              message: CART_ITEM_EXIST, controls: {
                confirm: {
                  onConfirm: () => {
                    matchedItem.SelectedQuantity = updatedQuantity;
                    this.updateCartItem(matchedItem);
                    this.updateProductQuantity(item.Product, item.SelectedQuantity);
                  }
                }
              }
            });
          }

        } else {
          this.saveCartItem(item);
          this.updateProductQuantity(item.Product, item.SelectedQuantity);
        }
      });

  }

  saveCartItem(item: CartItem) {
    console.log('saveItem called');
    this.store.dispatch(addItemToCartAction({ payload: item }));
    this.fbDataService.saveCartItemToDb(item);
  }

  updateCartItem(item: CartItem) {
    this.store.dispatch(updateItemInCartAction({ payload: item }));
    this.fbDataService.updateCartItemToDb(item);
  }

  /**
   * updates the product quantity in the store.
   * @param p the product to be added to cart
   * @param q the number of items to be bought
   */
  updateProductQuantity(p: Product, q: number) {
    p.Quantity = p.Quantity - q;
    this.store.dispatch(updateProductAction({ payload: p }));
    // this.fbDataService.updateProduct(p);
  }

  deleteItem($id: string) {
    this.store.dispatch(deleteItemInCartAction({ payload: $id }));
    this.fbDataService.deleteCartItemInDb($id);
  }

  searchItem(cart: CartItem[], item: CartItem) {
    return cart.find($item => $item.equals(item));
  }



  getCartFromStore() {
    return this.store.select('cart')
      .pipe(map(state => state.cart));
  }

  dispatchCartItemsToStore() {
    return this.fbDataService.fetchcartItemsFromDb()
      .pipe(
        take(1),
        tap(items => {
          this.store.dispatch(addItemsToCartAction({ payload: items }));
        })
      ).subscribe();
  }

}
