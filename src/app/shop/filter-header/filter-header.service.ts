import { Injectable } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { selectCategory, selectSize, selectSortOrder } from './store/filter.action';
import { LogService } from '../services/log.service';
import { Size } from 'src/app/models/size';
import { Sort } from 'src/app/models/Sort';

@Injectable({
  providedIn: 'root'
})
export class FilterHeaderService {

  constructor(private store: Store<AppState>,
              private logger: LogService) { }


  addSelectedCategory(c: Category) {
    this.logger.info('selected category dispatched -- ', c);
    this.store.dispatch(selectCategory({ payload: c }));
  }

  addSelectedSize(s: Size) {
    this.logger.info('selected size dispatched --', s);
    this.store.dispatch(selectSize({ payload: s }));
  }

  addSelectedSortOrder(s: Sort) {
    this.logger.info('selected sort dispatached -- ', s);
    this.store.dispatch(selectSortOrder({ payload: s }));
  }

}
