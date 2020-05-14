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

  preLoadItems = [];

  items: Product[];
  subs: Subscription[] = [];

  constructor(
    private homeService: HomeService) { }

  ngOnInit() {
    this.preLoadItems = [0, 0, 0, 0, 0, 0];
    this.getProducts();
  }



  getProducts() {
    this.subs[this.subs.length + 1] =
      this.homeService.getHomePageStore()
        .subscribe(state => {
            console.log('state.products = ', state.products);
            this.items = state.products;
            this.preLoadItems = [];
        });
  }


  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
