import { Component, OnInit, OnDestroy } from '@angular/core';

import { Product } from 'src/app/models/product';
import { HomeService } from '../home.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feature-items',
  templateUrl: './feature-items.component.html',
  styleUrls: ['./feature-items.component.scss']
})
export class FeatureItemsComponent implements OnInit, OnDestroy {

  items: Product[];
  subs: Subscription[] = [];

  constructor(
    private homeService: HomeService) { }

  ngOnInit() {
    this.subs[this.subs.length + 1] =
      this.homeService.getProductsFromStore().subscribe(state => {
        this.items = state.products;
      });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
