import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { Size } from 'src/app/models/size';
import { Sort } from 'src/app/models/Sort';
import { LogService } from 'src/app/services/log.service';
import { ProductService } from '../product.service';
import { FilterService } from '../filters/filter.service';
import { SubSink } from 'subsink';
import { staggerFadeIn } from 'src/app/animations/fadeAnimation';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  animations: [
    staggerFadeIn
  ]
})
export class ItemsComponent implements OnInit, OnDestroy {

  preloadItems = [];
  moreItemsLoading = false;
  items: Product[] = [];
  selectedCategories: Category[] = [];
  selectedSizes: Size[] = [];
  selectedSort: Sort;
  subs = new SubSink();

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
    this.subs.sink =
      this.productService.dispatchMoreProductsToStore().subscribe(() => {
        this.moreItemsLoading = true;
      });
  }

  getProducts() {
    this.subs.sink =
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
    this.subs.sink =
      this.filterService.getFiltersFromStore()
        .subscribe(filters => {
          this.logger.info('selected called from ItemsComponent');
          this.selectedCategories = [...filters.selectedCategory];
          this.selectedSizes = [...filters.selectedSize];
          this.selectedSort = filters.selectedSortOrder;
        });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
