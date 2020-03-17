import { Injectable } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { selectCategory, selectSize, selectSortOrder, saveAllCategories, saveAllSizes, saveAllSortOrders } from './store/filter.action';
import { Size } from 'src/app/models/size';
import { Sort } from 'src/app/models/Sort';
import { LogService } from 'src/app/services/log.service';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilterHeaderService {

  constructor(private store: Store<AppState>,
              private logger: LogService,
              private fbDBStore: FireStoreDbService
  ) {

  }


  fetchCategories() {
    return this.fbDBStore.getCategories()
      .pipe(
        map(categories => {
          this.store.dispatch(saveAllCategories({ payload: categories }));
        })
      );
  }

  fetchSizes() {
    return this.fbDBStore.getSizes()
      .pipe(
        map(sizes => {
          this.store.dispatch(saveAllSizes({ payload: sizes }));
        })
      );
  }

  fetchSortOrders() {
    return this.fbDBStore.getSortOrders()
      .pipe(
        map(sortOrders => {
          this.store.dispatch(saveAllSortOrders({ payload: sortOrders }));
        })
      );
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
