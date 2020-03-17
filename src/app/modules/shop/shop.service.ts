import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { map, take } from 'rxjs/operators';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';
import { addProductsAction, appendProductsAction } from './store/shop.actions';

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

   /** this method fetches the data from db store */
   dispatchMoreProductsToStore() {
    return this.fbDbService.fetchMoreProducts()
       .pipe(
         map(products => {
           console.log('more products got from dbstore : ', products);
           this.store.dispatch(appendProductsAction({ payload: products }));
         }));
   }

  getProductsFromStore() {
    return this.store.select('shop');
  }

  getProductFromStoreById(id: string) {

    return this.fbDbService.fetchProductsForHome()
      .pipe(
        take(1),
        map((products) => {
          console.log('products from state = ', products);
          return products.find(product => product.id === id);
        })
      );
  }
  
}
