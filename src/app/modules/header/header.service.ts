import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../main/store/app.reducer';
import { loadBrand } from './store/header.actions';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
   
  brand$ = this.store.select('header').pipe(map(state => state.brand));
 
  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadBrand());
   }
}
