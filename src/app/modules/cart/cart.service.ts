import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { cloneDeep, isEmpty } from 'lodash';
import { Observable, of, zip } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';
import { CartRemoteService } from 'src/app/services/remote/cart-remote.service';
import { cartLabels } from 'src/app/util/app.labels';
import { AuthService } from '../auth/auth.service';
import { AppState } from '../main/store/app.reducer';
import { DialogService } from '../shared/dialog/dialog.service';
import { ToastService } from '../shared/toasts/toast.service';
import { updateProductAction } from '../shop/store/shop.actions';
import { addItemToCartAction, deleteItemInCartAction, loadItemsToCartAction, updateItemInCartAction } from './store/cart.actions';




@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$ = this.store.select('cart').pipe(map(state => state.cart));
  cartSize$ = this.cart$.pipe(map(cart => cart?.map(item => item.SelectedQuantity).reduce((q, a) => a + q, 0)))

  constructor(
    private store: Store<AppState>,
    private db: CartRemoteService,
    private dialog: DialogService,
    private toastService: ToastService,
    private authService: AuthService
  ) {
    this.loadAllCartItems();
  }

  loadAllCartItems() {
    this.store.dispatch(loadItemsToCartAction());
  }

  addItem(item: CartItem) {
    console.log("addItem called ");
    return this.cart$.pipe(
      take(1),
      map(cart => this.findItem(cart, item)),
      switchMap(duplicateItem => !!duplicateItem ? this.updateQuantityForDuplicateItem(duplicateItem, item) : of(false)),
      switchMap(isDuplicate => !isDuplicate ? this.saveCartItem(item) : of(false)),
      tap(isSaved => {
        if (isSaved) {
          this.updateProductQuantity(item.Product, item.SelectedQuantity);
        }
      }),
      catchError(error => of(error))
    );
  }

  updateQuantityForDuplicateItem(matchedItem: CartItem, item: CartItem): Observable<boolean> {
    return this.dialog.confirmDuplicate()
      .pipe(
        switchMap(isOK => {
          if (isOK) {
            const updatedQuantity = matchedItem.SelectedQuantity + item.SelectedQuantity;
            const updatedCartItem = cloneDeep(matchedItem);
            updatedCartItem.SelectedQuantity = updatedQuantity;
            return this.updateCartItem(updatedCartItem);
          }
          return of(isOK);
        }),
        tap(isOK => {
          if (isOK) {
            this.updateProductQuantity(item.Product, item.SelectedQuantity);
          }
        }),
        catchError(error => of(error))
      );
  }


  saveCartItem(item: CartItem): Observable<boolean> {
    return this.db.saveCartItemToDb(item)
      .pipe(tap(isOK => {
        if (isOK) {
          this.store.dispatch(addItemToCartAction({ payload: item }));
          this.toastService.success(cartLabels.addItem, 'cart-plus');
        }
      }),
        catchError(error => {
          console.log("error happened during item add to cart", error);
          this.toastService.failure(cartLabels.addItemFailed);
          return of(error);
        }));
  }

  updateCartItem(item: CartItem): Observable<boolean> {
    return this.db.updateCartItem(item)
      .pipe(
        tap(isOk => {
          console.log('isOK called');
          if (isOk) {
            this.store.dispatch(updateItemInCartAction({ payload: item }));
            this.toastService.success(cartLabels.updateItem);
          }
        }));
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


  deleteItem(id: string) {
    return this.dialog.confirmRemoval()
      .pipe(
        switchMap(isOk => isOk ? this.db.deleteCartItem(id) : of(isOk)),
        tap(isOk => {
          if (isOk) {
            this.store.dispatch(deleteItemInCartAction({ payload: id }));
            this.toastService.success(cartLabels.deleteItem);
          }
        }),
        catchError(error => {
          this.toastService.failure(cartLabels.deleteItemFailed);
          return of(error);
        })
      );
  }

  findItem(cart: CartItem[], item: CartItem) {
    return cart.find($item => $item.equals(item));
  }


  loadCartItemsOnUserChange$ =
    this.authService.userFromStore$
      .pipe(
        switchMap(user => {
          return zip(of(user), this.cart$)
        }),
        switchMap(([user, cart]) => {
          if (!!user && !user.IsAnonymous && !isEmpty(cart)) {
            if (cart[0].IsAnonymousUser) {
              const refreshedCartItems = cloneDeep(cart).map(item => {
                item.UserId = user.UID;
                item.IsAnonymousUser = user.IsAnonymous;
                return item;
              });
              return this.db.updateCart(refreshedCartItems);
            }
            return of(true);
          }
          return of(true);
        }),
        tap(isUpdated => {
          this.store.dispatch(loadItemsToCartAction());
        })
      );



}
