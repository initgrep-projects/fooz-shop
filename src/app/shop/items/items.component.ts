import { Component, OnInit, OnDestroy } from '@angular/core';
import { RemoteService } from '../services/remote.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { LogService } from '../services/log.service';
import { Subscription } from 'rxjs';
import { Size } from 'src/app/models/size';
import { Sort } from 'src/app/models/Sort';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy {

  items: Product[];
  selectedCategory: Category;
  selectedSize: Size;
  selectedSort: Sort;
  subs: Subscription[] = [];

  constructor(
    private remoteService: RemoteService,
    private store: Store<AppState>,
    private logger: LogService
    ) { }


  ngOnInit() {

    this.subs[this.subs.length + 1] =
    this.store.select('shop').subscribe(state => {
      this.items = state.products;
    });

    this.subs[this.subs.length + 1] =
    this.store.select('filters').subscribe(filters =>{
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
