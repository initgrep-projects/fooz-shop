import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { map, take } from 'rxjs/operators';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';
import { fetchProductsAction } from './store/shop.actions';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private store: Store<AppState>,
              private fbDbService: FireStoreDbService) {
    this.dispatchProductsToStore();
  }

  dispatchProductsToStore() {
    this.fbDbService.getProducts()
      .subscribe(products => {
        console.log('products got from dbstore : ', products);
        this.store.dispatch(fetchProductsAction({ payload: products }));
      });

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
