import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { isEmpty } from 'lodash';
import { of, zip, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { CART_ITEM_EXIST, CART_ITEM_MAX_QUANTITY } from 'src/app/util/app.constants';

import { CartItem } from 'src/app/models/cartItem';
import { Product } from 'src/app/models/product';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';
import { AuthService } from '../auth/auth.service';
import { AppState } from '../main/store/app.reducer';
import { AlertService } from '../shared/alert/alert.service';
import { ToastService } from '../shared/toasts/toast.service';
import { updateProductAction } from '../shop/store/shop.actions';
import { addItemsToCartAction, addItemToCartAction, deleteItemInCartAction, updateItemInCartAction } from './store/cart.actions';
import { toastLabels } from 'src/app/util/app.labels';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: Observable<CartItem[]>;

  constructor(
    private store: Store<AppState>,
    private db: FireStoreDbService,
    private alertService: AlertService,
    private toastService: ToastService,
    private authService: AuthService
  ) {
    this.cart$  =  this.store.select('cart').pipe(map(state => state.cart));
  }

 


  addItem(item: CartItem) {

    this.cart$
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
          this.toastService.show(toastLabels.itemAddedToCart, { icon: 'cart-plus' });
        }
      });

  }

  saveCartItem(item: CartItem) {
    console.log('saveItem called');
    this.store.dispatch(addItemToCartAction({ payload: item }));
    this.db.saveCartItemToDb(item);
  }


  updateCartItem(item: CartItem) {
    this.store.dispatch(updateItemInCartAction({ payload: item }));
    this.db.updateCartItemInDb(item);
  }

  /**
   * updates the product quantity in the store.
   * @param p the product to be added to cart
   * @param q the number of items to be bought
   */
  updateProductQuantity(p: Product, q: number) {
    p.Quantity = p.Quantity - q;
    this.store.dispatch(updateProductAction({ payload: p }));
    // this.db.updateProduct(p);
  }

  deleteItem($id: string) {
    this.store.dispatch(deleteItemInCartAction({ payload: $id }));
    this.db.deleteCartItemInDb($id);
  }

  searchItem(cart: CartItem[], item: CartItem) {
    return cart.find($item => $item.equals(item));
  }



 
  

  /**
   * on the user change,
   * a) load the existing cart items from db to store
   * if:
   * 1) current user was real user and last user was real user
   * 2) current user was real anonymous and last user was real
   * 
   * else:
   * 3) current user is anonymous and new user is real
   *   -  update the current cartItems with current User
   *   - do operation (a)
   * 
   */
  dispatchCartItemsToStore() {

    return this.authService.userFromStore$
      .pipe(
        switchMap(user => {
          return zip(of(user), this.cart$)
        }),
        tap(([user, cart]) => {
          if (!!user && !user.IsAnonymous && !isEmpty(cart)) {
            if (cart[0].IsAnonymousUser) {
              const refreshedCartItems = cart.map(item => {
                item.UserId = user.UID;
                item.IsAnonymousUser = user.IsAnonymous;
                return item;
              });
              this.db.updateCartInDb(refreshedCartItems);
            }
          }
        }),
        map(([user, cart]) => {
          return user;
        }),
        switchMap(user => {
          if (!!user) {
            return this.db.fetchcartItemsFromDb(user.UID)
          }
          return of([]);
        }),
        tap((items: CartItem[]) => {
          this.store.dispatch(addItemsToCartAction({ payload: items }));
        })
      )

  }

}
