import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, take, switchMap, tap } from 'rxjs/operators';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';
import { addProductsAction, appendProductsAction, addCustomSizeInputAction, addTrendItemsAction } from './store/shop.actions';
import { of } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AppState } from '../main/store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private store: Store<AppState>,
    private fbDbService: FireStoreDbService) {
    this.dispatchProductsToStore();
    this.dispatchTrendItemsToStore();
    this.dispatachCustomSizeInputsToStore();
  }

  /** this method fetches the data from db store */
  dispatchProductsToStore() {
    return this.fbDbService.fetchProducts()
      .pipe(
        take(1),
        map(products => {
          console.log('products got from dbstore : ', products);
          this.store.dispatch(addProductsAction({ payload: products }));
        })).subscribe();
  }

  /**
   * this method is required to lazy load the data from the db
   * to  enable pagination
   */
  dispatchMoreProductsToStore() {
    return this.fbDbService.fetchMoreProducts()
      .pipe(
        tap(products => {
          console.log('more products got from dbstore : ', products);
          this.store.dispatch(appendProductsAction({ payload: products }));
        }));
  }

  dispatachCustomSizeInputsToStore() {
    return this.fbDbService.fetchCustomSizeInputs()
      .pipe(
        take(1),
        tap(inputs => {
          console.log('custom size inputs from dbstore: ', inputs);
          this.store.dispatch(addCustomSizeInputAction({ payload: inputs }));
        })
      ).subscribe();
  }

  getShopFromStore() {
    return this.store.select('shop');
  }

  /**
   * This method fetches the product based on the product id.
   * if product is not present in the local store,
   * it is fetched from the database
   * @param id the product id
   */
  getProductFromStoreById(id: string) {
    return this.store.select('shop')
      .pipe(
        take(1),
        switchMap(state => {
          if (!state.products || state.products.length === 0) {
            const product = this.fbDbService.fetchProductById(id);
            return product;
          } else {
            return of(state.products.find(product => product.Id === id));
          }
        })
      );
  }

  dispatchTrendItemsToStore() {
    return this.fbDbService.fetchTrendItems()
      .pipe(
        take(1),
        tap(items => this.store.dispatch(addTrendItemsAction({ payload: items })))
      ).subscribe();
  }

}
