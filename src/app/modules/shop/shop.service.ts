import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { map, take } from 'rxjs/operators';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';
import { addProductsAction } from './store/shop.actions';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private store: Store<AppState>,
              private fbDbService: FireStoreDbService) {
  }

  /** this method fetches the data from db store */
  dispatchProductsToStore() {
   return this.fbDbService.fetchProducts()
      .pipe(
        map(products => {
          console.log('products got from dbstore : ', products);
          this.store.dispatch(addProductsAction({ payload: products }));
        }));
  }

  getProductsFromStore() {
    return this.store.select('shop');
  }

  getProductFromStoreById(id: string) {
    return this.store.select('shop')
      .pipe(
        take(1),
        map((state) => {
          return state.products.find(product => product.id === id);
        })
      );
  }
}
