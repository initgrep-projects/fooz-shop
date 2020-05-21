import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';
import { addItemToCartAction, addItemsToCartAction, updateItemInCartAction } from './store/cart.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../main/store/app.reducer';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';
import { CartItem } from 'src/app/models/cartItem';
import { tap } from 'rxjs/operators';
import { isEqualWith } from 'lodash';
import { Size } from 'src/app/models/size';
import { Color } from 'src/app/models/color';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: CartItem[];

  constructor(
    private store: Store<AppState>,
    private fbDataService: FireStoreDbService
  ) { }


  saveItem(p: Product, q: number, u: string) {
    console.log('saveItem to cart called ', p);
    const cartItem = new CartItem(u, p, q);
    console.log('cartItem = ', cartItem);
    // check if the item is present
    // yes -> add the quantity and update the item
    //no -> save the item
    const itemPresent = this.isItemPresent(cartItem);
    console.log('isCartItemPresent = ', itemPresent);
    if (!!itemPresent) {
      //update
      cartItem.Quantity = cartItem.Quantity + 1;
      this.store.dispatch(updateItemInCartAction({ payload: cartItem }));
      this.fbDataService.updateCartItemToDb(cartItem);//write implementation here
    } else {
      this.store.dispatch(addItemToCartAction({ payload: cartItem }));
      this.fbDataService.saveCartItemToDb(cartItem);
    }


  }

  isItemPresent(item: CartItem) {
    return this.cart.find(_item => {
      const isSizeEqual = isEqualWith(_item.Product.Sizes, item.Product.Sizes, (a: Size, b: Size) => a.Letter === b.Letter);
      const isColorEqual = isEqualWith(_item.Product.Colors, item.Product.Colors, (a: Color, b: Color) => a.Code === b.Code);
      return isSizeEqual && isColorEqual && (_item.Product.Id === item.Product.Id);
    });
  }

  getCartFromStore() {
    return this.store.select('cart');
  }

  dispatchCartItemsToStore() {
    return this.fbDataService.fetchcartItemsFromDb()
      .pipe(
        tap(items => this.store.dispatch(addItemsToCartAction({ payload: items })))
      );
  }

}
