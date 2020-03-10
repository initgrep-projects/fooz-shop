import { Injectable } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { selectCategory, selectSize, selectSortOrder, fetchAllCategories, fetchAllSizes, fetchAllSortOrders } from './store/filter.action';
import { Size } from 'src/app/models/size';
import { Sort } from 'src/app/models/Sort';
import { LogService } from 'src/app/services/log.service';
import { FakedataService } from 'src/app/services/fakedata.service';

@Injectable({
  providedIn: 'root'
})
export class FilterHeaderService {

  constructor(private store: Store<AppState>,
              private logger: LogService,
              private rs: FakedataService) {

      this.dispatchCategoriesToStore();
      this.dispatchSizesToStore();
      this.dispatchSortsToStore();
    }


  dispatchCategoriesToStore() {
    const categories = this.rs.getCategories();
    this.store.dispatch(fetchAllCategories({ payload: categories }));
  }

  dispatchSizesToStore() {
    const sizes = this.rs.getSizes();
    this.store.dispatch(fetchAllSizes({ payload: sizes }));
  }

  dispatchSortsToStore() {
    const sortOrders = this.rs.getSortOrders();
    this.store.dispatch(fetchAllSortOrders({ payload: sortOrders }));
  }


  getFiltersFromStore(){
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
