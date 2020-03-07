import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Subscription } from 'rxjs';
import { LogService } from '../services/log.service';
import { FilterHeaderService } from './filter-header.service';

@Component({
  selector: 'app-filter-header',
  templateUrl: './filter-header.component.html',
  styleUrls: ['./filter-header.component.scss']
})
export class FilterHeaderComponent implements OnInit, OnDestroy {


  categories: Category[] = [];
  selectedCategory: Category;

  constructor(private store: Store<AppState>,
              private filterHeaderService: FilterHeaderService,
              private logger: LogService) { }

  subs: Subscription[] = [];


  ngOnInit(): void {
    this.fetchCategories();
    this.getSelectedCategory();
  }

  fetchCategories() {
    this.subs[this.subs.length + 1] =
      this.store.select('filters').subscribe(filters => {
        this.categories = filters.categories;
      });
  }

  getSelectedCategory() {
    this.subs[this.subs.length + 1] =
      this.store.select('filters').subscribe(filters => {
        this.logger.info('fetching from store after change ', filters.selectedCategory);
        this.selectedCategory = filters.selectedCategory;
      });
  }

  onCategoryChange(c: Category) {
    this.logger.info('selected category = ', c);
    this.filterHeaderService.addSelectedCategory(c);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }


}
