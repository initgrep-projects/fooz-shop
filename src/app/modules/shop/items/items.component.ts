import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { Subscription } from 'rxjs';
import { Size } from 'src/app/models/size';
import { Sort } from 'src/app/models/Sort';
import { LogService } from 'src/app/services/log.service';
import { ProductService } from '../product.service';
import { FilterService } from '../filter-header/filter.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy {

  preloadItems = [];
  moreItemsLoading = false;
  items: Product[];
  selectedCategory: Category;
  selectedSize: Size;
  selectedSort: Sort;
  subs: Subscription[] = [];

  constructor(
    private productService: ProductService,
    private filterService: FilterService,
    private logger: LogService
  ) { }


  ngOnInit() {
    this.preloadItems = [0, 0, 0, 0, 0, 0];
    this.getProducts();
    this.getFilters();
  }


  addMoreProductsToStore() {
    this.subs[this.subs.length + 1] =
      this.productService.dispatchMoreProductsToStore().subscribe(() => {
        this.moreItemsLoading = true;
      });
  }

  getProducts() {
    this.subs[this.subs.length + 1] =
      this.productService.getShopFromStore()
        .subscribe(state => {
          setTimeout(() => {
            console.log('products fetched From store = ', state.products);
            this.items = state.products;
            this.preloadItems = [];
            this.moreItemsLoading = false;
          }, 1000);
        });
  }

  getFilters() {
    this.subs[this.subs.length + 1] =
      this.filterService.getFiltersFromStore()
        .subscribe(filters => {
          this.logger.info('selected called from ItemsComponent');
          this.selectedCategory = filters.selectedCategory;
          this.selectedSize = filters.selectedSize;
          this.selectedSort = filters.selectedSortOrder;
        });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
