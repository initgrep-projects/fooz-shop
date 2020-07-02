import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category } from 'src/app/models/category';
import { Size } from 'src/app/models/size';
import { Sort } from 'src/app/models/Sort';
import { LogService } from 'src/app/services/log.service';
import { AppState } from '../../main/store/app.reducer';
import { loadAllCategoriesAction, loadAllSizesAction, loadAllSortOrdersAction, selectedCategoriesAction, selectedSizesAction, selectSortOrderAction } from './store/filter.action';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  categories$ = this.store.select('filters').pipe(map(state => state.categories));
  sizes$ = this.store.select('filters').pipe(map(state => state.sizes));
  sorts$ = this.store.select('filters').pipe(map(state => state.sortOrders));
  selectedCategories$ = this.store.select('filters').pipe(map(state => state.selectedCategory));
  selectedSizes$ = this.store.select('filters').pipe(map(state => state.selectedSize));
  selectedSort$ = this.store.select('filters').pipe(map(state => state.selectedSortOrder));

  constructor(private store: Store<AppState>,
    private logger: LogService
  ) {
    this.store.dispatch(loadAllCategoriesAction());
    this.store.dispatch(loadAllSizesAction());
    this.store.dispatch(loadAllSortOrdersAction());
  }


  setSelectedCategories(c: Category[]) {
    this.logger.info('selected category dispatched -- ', c);
    this.store.dispatch(selectedCategoriesAction({ payload: c }));
  }

  setSelectedSizes(s: Size[]) {
    this.logger.info('selected size dispatched --', s);
    this.store.dispatch(selectedSizesAction({ payload: s }));
  }

  setSelectedSortOrder(s: Sort) {
    this.logger.info('selected sort dispatached -- ', s);
    this.store.dispatch(selectSortOrderAction({ payload: s }));
  }

}
