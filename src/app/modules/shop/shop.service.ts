import { Injectable } from '@angular/core';
import { RemoteService } from 'src/app/services/remote.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { fetchProductsAction } from './store/shop.actions';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private rs: RemoteService,
              private store: Store<AppState>) { 
                this.dispatchProductsToStore();
              }

  dispatchProductsToStore() {
    const products = this.rs.getProducts();
    this.store.dispatch(fetchProductsAction({ payload: products }));
  }

  getProductsFromStore() {
    return this.store.select('shop');
  }

  getProductFromStoreById(id: string) {
    return this.store.select('shop')
        .pipe(
          take(1),
          map((state) => {
            return  state.products.find(product => product.id === id);
            })
          );
  }
}
