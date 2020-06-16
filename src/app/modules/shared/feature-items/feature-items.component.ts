import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';
import { ProductService } from '../../shop/product.service';
import { featureItemsLabels } from 'src/app/util/app.labels';

@Component({
  selector: 'app-feature-items',
  templateUrl: './feature-items.component.html',
  styleUrls: ['./feature-items.component.scss']
})
export class FeatureItemsComponent implements OnInit, OnDestroy {
  labels = featureItemsLabels;
  @Input() showParallax: boolean = true;
  @Input() title:string;

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
