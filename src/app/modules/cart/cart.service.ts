import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';
import { addItemToCartAction, addItemsToCartAction } from './store/cart.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../main/store/app.reducer';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';
import { CartItem } from 'src/app/models/cartItem';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
     private store: Store<AppState>,
     private fbDataService: FireStoreDbService
     ) { }


  saveItem(p: Product, q: number, u: string) {
    console.log('saveItem to cart called ', p);
    const cartItem = new CartItem(u, p, q);
    console.log('cartItem = ', cartItem);
    this.store.dispatch(addItemToCartAction({payload: cartItem}));
    this.fbDataService.saveCartItemToDb(cartItem);
  }

  getCartFromStore() {
    return this.store.select('cart');
  }

  dispatchCartItemsToStore() {
    return this.fbDataService.fetchcartItemsFromDb()
    .pipe(
      tap(items => this.store.dispatch(addItemsToCartAction({payload: items})))
    );
  }

}
