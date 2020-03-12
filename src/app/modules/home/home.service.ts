import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { addProductsAction } from '../shop/store/shop.actions';
import { FakedataService } from 'src/app/services/fakedata.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private rs: FakedataService,
              private store: Store<AppState>) {
    this.dispatchProductsToStore();
  }

  dispatchProductsToStore() {
    const products = this.rs.getProducts();
    this.store.dispatch(addProductsAction({ payload: products }));
  }

  getProductsFromStore() {
    return this.store.select('shop');
  }
}
