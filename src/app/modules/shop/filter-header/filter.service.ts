import { Injectable } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Store } from '@ngrx/store';
import { selectCategory, selectSize, selectSortOrder, saveAllCategories, saveAllSizes, saveAllSortOrders } from './store/filter.action';
import { Size } from 'src/app/models/size';
import { Sort } from 'src/app/models/Sort';
import { LogService } from 'src/app/services/log.service';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';
import { map, take } from 'rxjs/operators';
import { AppState } from '../../main/store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private store: Store<AppState>,
              private logger: LogService,
              private fbDBStore: FireStoreDbService
  ) {
    this.dispatchCategoriesToStore();
    this.dispatchSizesToStore();
    this.dispatchSortOrdersToStore();
  }


  dispatchCategoriesToStore() {
    return this.fbDBStore.fetchCategories()
      .pipe(
        take(1),
        map(categories => {
          this.store.dispatch(saveAllCategories({ payload: categories }));
        })
      ).subscribe();
  }

  dispatchSizesToStore() {
    return this.fbDBStore.fetchSizes()
      .pipe(
        take(1),
        map(sizes => {
          this.store.dispatch(saveAllSizes({ payload: sizes }));
        })
      ).subscribe();
  }

  dispatchSortOrdersToStore() {
    return this.fbDBStore.fetchSortOrders()
      .pipe(
        take(1),
        map(sortOrders => {
          this.store.dispatch(saveAllSortOrders({ payload: sortOrders }));
        })
      ).subscribe();
  }


  getFiltersFromStore() {
    return this.store.select('filters');
  }

  setSelectedCategory(c: Category) {
    this.logger.info('selected category dispatched -- ', c);
    this.store.dispatch(selectCategory({ payload: c }));
  }

  setSelectedSize(s: Size) {
    this.logger.info('selected size dispatched --', s);
    this.store.dispatch(selectSize({ payload: s }));
  }

  setSelectedSortOrder(s: Sort) {
    this.logger.info('selected sort dispatached -- ', s);
    this.store.dispatch(selectSortOrder({ payload: s }));
  }

}
