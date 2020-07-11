import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from '../main/store/app.reducer';
import { loadLatestProducts, loadLookBookItems, loadTrendItems } from './store/home.action';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  trendItems$ = this.store.select('home').pipe(map(state => state.trend));
  lookbookItems$ = this.store.select('home').pipe(map(state => state.lookbook));
  latestProducts$ = this.store.select('home').pipe(map(state => state.latestsProducts));

  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadTrendItems());
    this.store.dispatch(loadLookBookItems());
    this.store.dispatch(loadLatestProducts());
  }



}
