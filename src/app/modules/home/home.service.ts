import { Injectable } from '@angular/core';
import { RemoteService } from 'src/app/services/remote.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { fetchProductsAction } from '../shop/store/shop.actions';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private rs: RemoteService,
              private store: Store<AppState>) {
    this.dispatchProductsToStore();
  }

  dispatchProductsToStore() {
    const products = this.rs.getProducts();
    this.store.dispatch(fetchProductsAction({ payload: products }));
  }

  getProductsFromStore(){
    return this.store.select('shop');
  }
}
