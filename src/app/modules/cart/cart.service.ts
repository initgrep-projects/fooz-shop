import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';
import { addItemToCartAction, addItemsToCartAction, updateItemInCartAction, deleteItemInCartAction } from './store/cart.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../main/store/app.reducer';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';
import { CartItem } from 'src/app/models/cartItem';
import { tap, map, take } from 'rxjs/operators';
import { isIdentical } from 'src/app/helpers/util';



@Injectable({
  providedIn: 'root'
})
export class CartService {



  constructor(
    private store: Store<AppState>,
    private fbDataService: FireStoreDbService
  ) { }


  saveItem(item: CartItem) {

    this.getCartFromStore()
      .pipe(take(1))
      .subscribe(cart => {
        console.log('saveItem to cart called ', item);

        console.log('cart before search ', cart);
        const searchedItem = this.searchItem(cart, item);
        console.log('searchedItem Present = ', searchedItem);
        console.log('cart after search', cart);
        if (!!searchedItem) {
          //   //update
          item.SelectedQuantity = searchedItem.SelectedQuantity + item.SelectedQuantity;
          this.store.dispatch(updateItemInCartAction({ payload: item }));
          this.fbDataService.updateCartItemToDb(item);
        } else {
          //save
          this.store.dispatch(addItemToCartAction({ payload: item }));
          this.fbDataService.saveCartItemToDb(item);
        }
      });

  }

  deleteItem($id:string){
    this.store.dispatch(deleteItemInCartAction({payload: $id}));
    this.fbDataService.deleteCartItemInDb($id);
  }

  searchItem(cart: CartItem[], item: CartItem) {
    return cart.find(_item => _item.equals(item));
  }



  getCartFromStore() {
    return this.store.select('cart')
      .pipe(map(state => state.cart));
  }

  dispatchCartItemsToStore() {
    return this.fbDataService.fetchcartItemsFromDb()
      .pipe(
        tap(items => {
          console.log('items from cart db = ', items);
          this.store.dispatch(addItemsToCartAction({ payload: items }))
        })
      );
  }

}
