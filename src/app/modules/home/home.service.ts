import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';
import { map, take, switchMap } from 'rxjs/operators';
import { addProductsToHomeAction } from './store/home.action';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private store: Store<AppState>,
    private fbDbService: FireStoreDbService) {
  }

  /** this method fetches the data from db store */
  dispatchProductsToStore() {
    return this.fbDbService.fetchProductsForHome()
      .pipe(
        map(products => {
          console.log('products got from dbstore : ', products);
          this.store.dispatch(addProductsToHomeAction({ payload: products }));
        }));
  }

  getProductsFromStore() {
    return this.store.select('home');
  }


  getProductFromStoreById(id: string) {
    return this.store.select('home')
      .pipe(
        take(1),
        switchMap(state => {
          if (!state.products || state.products.length === 0) {
            const product = this.fbDbService.fetchProductByid(id);
            return product;
          } else {
            return of(state.products.find(product => product.id === id));
          }
        })
      );


  }
}
