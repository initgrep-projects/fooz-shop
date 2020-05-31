import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilterService } from '../filter-header/filter.service';
import { SubSink } from 'subsink';
import { Category } from 'src/app/models/category';
import { Size } from 'src/app/models/size';
import { Sort } from 'src/app/models/Sort';

@Component({
  selector: 'app-side-filter-bar',
  templateUrl: './side-filter-bar.component.html',
  styleUrls: ['./side-filter-bar.component.scss']
})
export class SideFilterBarComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  categories: Category[] = [];
  selectedCategory: Category;
  sizes: Size[] = [];
  selectedSize: Size;
  sortOrders: Sort[] = [];
  selectedSortOrder: Sort;

  constructor(private fhs: FilterService) { }

  ngOnInit(): void {
    this.fetchFilters();
  }


  fetchFilters() {
    this.subs.sink =
      this.fhs.getFiltersFromStore().subscribe(filters => {
        this.categories = filters.categories;
        this.selectedCategory = filters.selectedCategory;

        this.sizes = filters.sizes;
        this.selectedSize = filters.selectedSize;

        this.sortOrders = filters.sortOrders;
        this.selectedSortOrder = filters.selectedSortOrder;
      });
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

}
