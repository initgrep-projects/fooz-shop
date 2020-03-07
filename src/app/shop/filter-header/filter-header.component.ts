import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Subscription } from 'rxjs';
import { LogService } from '../services/log.service';
import { FilterHeaderService } from './filter-header.service';
import { Size } from 'src/app/models/size';
import { Sort } from 'src/app/models/Sort';

@Component({
  selector: 'app-filter-header',
  templateUrl: './filter-header.component.html',
  styleUrls: ['./filter-header.component.scss']
})
export class FilterHeaderComponent implements OnInit, OnDestroy {


  categories: Category[] = [];
  selectedCategory: Category;

  sizes: Size[] = [];
  selectedSize: Size;

  sortOrders: Sort[] = [];
  selectedSortOrder: Sort;

  constructor(private store: Store<AppState>,
              private filterHeaderService: FilterHeaderService,
              private logger: LogService) { }

  subs: Subscription[] = [];


  ngOnInit(): void {
    this.fetchFilters();
    // this.getSelectedFilters();
  }

  fetchFilters() {
    this.subs[this.subs.length + 1] =
      this.store.select('filters').subscribe(filters => {
        this.categories = filters.categories;
        this.selectedCategory = filters.selectedCategory;

        this.sizes = filters.sizes;
        this.selectedSize = filters.selectedSize;

        this.sortOrders = filters.sortOrders;
        this.selectedSortOrder = filters.selectedSortOrder;
      });
  }



  onCategoryChange(c: Category) {
    this.logger.info('selected category = ', c);
    this.filterHeaderService.addSelectedCategory(c);
  }

  onSizeChange(s: Size) {
    this.logger.info('selected size = ', s);
    this.filterHeaderService.addSelectedSize(s);
  }

  onSortOrderChange(s: Sort) {
    this.logger.info('selected Sort Change = ', s);
    this.filterHeaderService.addSelectedSortOrder(s);
  }


  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }


}
