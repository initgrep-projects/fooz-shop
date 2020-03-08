import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Subscription } from 'rxjs';
import { FilterHeaderService } from './filter-header.service';
import { Size } from 'src/app/models/size';
import { Sort } from 'src/app/models/Sort';
import { LogService } from 'src/app/services/log.service';

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

  constructor(private fhs: FilterHeaderService,
              private logger: LogService) { }

  subs: Subscription[] = [];


  ngOnInit(): void {
    this.fetchFilters();
  }

  fetchFilters() {
    this.subs[this.subs.length + 1] =
      this.fhs.getFiltersFromStore().subscribe(filters => {
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
    this.fhs.setSelectedCategory(c);
  }

  onSizeChange(s: Size) {
    this.logger.info('selected size = ', s);
    this.fhs.setSelectedSize(s);
  }

  onSortOrderChange(s: Sort) {
    this.logger.info('selected Sort Change = ', s);
    this.fhs.setSelectedSortOrder(s);
  }


  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }


}
