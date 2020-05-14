import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';
import { addItemToCartAction } from './store/cart.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../main/store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor( private store: Store<AppState>) { }


  addProductTocart(p: Product) {
    console.log('addProduct to cart called ', p);
    this.store.dispatch(addItemToCartAction({payload: p}));
  }

  getCartFromStore() {
    return this.store.select('cart');
  }
}
