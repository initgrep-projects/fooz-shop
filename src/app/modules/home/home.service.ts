import { Injectable } from '@angular/core';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';
import { take, tap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../main/store/app.reducer';
import { adddLookBookItems } from './store/home.action';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private db: FireStoreDbService,
    private store: Store<AppState>
  ) {
    this.db.fetchLookBookItems()
    .pipe(
      take(1),
      tap(items => console.log('lookbook items ', items)),
      tap(items => this.store.dispatch(adddLookBookItems({payload:items})))
      ).subscribe();
  }

  lookbookItems$ = this.store.select('home').pipe(map(state => state.lookbook));

}
