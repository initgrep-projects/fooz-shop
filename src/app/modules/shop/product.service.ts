import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { ProductRemoteService } from 'src/app/services/remote/product-remote.service';
import { AppState } from '../main/store/app.reducer';
import { loadCustomSizeInputs, loadMoreProducts, loadProducts } from './store/shop.actions';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products$ = this.store.select('shop').pipe(map(state => state.products));
  customSizeInputs$ = this.store.select('shop').pipe(map(state => state.customSizeInput));

  constructor(
    private store: Store<AppState>,
    private fbDbService: ProductRemoteService) {
    this.store.dispatch(loadProducts());
    this.store.dispatch(loadCustomSizeInputs())
  }

  /**
   * this method is required to lazy load the data from the db
   * to  enable pagination
   */
  getMoreProducts() {
    this.store.dispatch(loadMoreProducts());
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


}
