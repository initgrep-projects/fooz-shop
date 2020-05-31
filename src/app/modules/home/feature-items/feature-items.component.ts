import { Component, OnInit, OnDestroy } from '@angular/core';

import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';
import { ProductService } from '../../shop/product.service';

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
    private productService: ProductService) { }

  ngOnInit() {
    this.preLoadItems = [0, 0, 0, 0, 0, 0];
    this.getProducts();
  }



  getProducts() {
    this.subs[this.subs.length + 1] =
      this.productService.getShopFromStore()
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
