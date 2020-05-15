import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';
import { addItemToCartAction } from './store/cart.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../main/store/app.reducer';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';
import { CartItem } from 'src/app/models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
     private store: Store<AppState>,
     private fbDataService:FireStoreDbService
     ) { }


  addItem(p: Product, q: number, u:string) {
    console.log('addProduct to cart called ', p);
    this.store.dispatch(addItemToCartAction({payload: new CartItem(u, p,q)}));
  }

  getCartFromStore() {
    return this.store.select('cart');
  }
}
