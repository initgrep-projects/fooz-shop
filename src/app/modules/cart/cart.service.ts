import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { cloneDeep, isEmpty } from 'lodash';
import { of, zip } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { CartItem } from 'src/app/models/cartItem';
import { Product } from 'src/app/models/product';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';
import { ADD_BUTTON, CART_ITEM_EXIST, CART_ITEM_MAX_QUANTITY, DUPLICATE_ALERT_TITLE } from 'src/app/util/app.constants';
import { toastLabels } from 'src/app/util/app.labels';
import { AuthService } from '../auth/auth.service';
import { AppState } from '../main/store/app.reducer';
import { AlertService } from '../shared/alert/alert.service';
import { ToastService } from '../shared/toasts/toast.service';
import { updateProductAction } from '../shop/store/shop.actions';
import { addItemToCartAction, deleteItemInCartAction, loadItemsToCartAction, updateItemInCartAction } from './store/cart.actions';




@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$ = this.store.select('cart').pipe(map(state => state.cart));

  constructor(
    private store: Store<AppState>,
    private db: FireStoreDbService,
    private alertService: AlertService,
    private toastService: ToastService,
    private authService: AuthService
  ) {
    this.store.dispatch(loadItemsToCartAction());
  }


  addItem(item: CartItem) {
    this.cart$.pipe(take(1))
      .subscribe(cart => {
        const matchedItem = this.searchItem(cart, item);
        if (!!matchedItem) {
          this.updateQuantityInExistingItem(matchedItem, item);
        } else {
          this.saveCartItem(item);
          this.updateProductQuantity(item.Product, item.SelectedQuantity);
          this.toastService.success(toastLabels.itemAddedToCart, 'cart-plus');
        }
      });
  }

  updateQuantityInExistingItem(matchedItem: CartItem, item: CartItem) {
    console.log('updating the existing item');
    const updatedQuantity = matchedItem.SelectedQuantity + item.SelectedQuantity;
    if (updatedQuantity > item.Product.Quantity) {
      this.alertService.open({ message: CART_ITEM_MAX_QUANTITY, controls: { cancel: { visible: false } } });
    } else {
      this.alertService.open({
        message: CART_ITEM_EXIST,
        title: DUPLICATE_ALERT_TITLE,
        controls: {
          confirm: {
            text: ADD_BUTTON,
            onConfirm: () => {
              matchedItem.SelectedQuantity = updatedQuantity;
              this.updateCartItem(matchedItem);
              this.updateProductQuantity(item.Product, item.SelectedQuantity);
            }
          }
        }
      });
    }
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
    const product = cloneDeep(p);
    product.Quantity = p.Quantity - q;
    this.store.dispatch(updateProductAction({ payload: product }));
    // this.db.updateProduct(p);
  }

  // deleteItem($id: string) {
  //   this.alertService.open({
  //     title: REMOVE_ALERT_TITLE,
  //     message: CART_REMOVE_ITEM_MSG,
  //     controls: {
  //       confirm: {
  //         text: REMOVE_BUTTON,
  //         onConfirm: () => {
  //           this.store.dispatch(deleteItemInCartAction({ payload: $id }));
  //           this.db.deleteCartItemInDb($id);
  //         }
  //       }
  //     }
  //   });

  // }

  deleteItem($id: string) {
    this.alertService.showRemoveAlert(() => {
      this.store.dispatch(deleteItemInCartAction({ payload: $id }));
      this.db.deleteCartItemInDb($id);
    });
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
  loadCartItemsOnUserChange() {
    return this.authService.userFromStore$
      .pipe(
        switchMap(user => {
          return zip(of(user), this.cart$)
        }),
        tap(([user, cart]) => {
          if (!!user && !user.IsAnonymous && !isEmpty(cart)) {
            if (cart[0].IsAnonymousUser) {
              const refreshedCartItems = cloneDeep(cart).map(item => {
                item.UserId = user.UID;
                item.IsAnonymousUser = user.IsAnonymous;
                return item;
              });
              this.db.updateCartInDb(refreshedCartItems);
            }
          }
          this.store.dispatch(loadItemsToCartAction());
        })
      )
  }

}
