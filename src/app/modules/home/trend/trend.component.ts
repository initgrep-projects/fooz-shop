import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { isEmpty } from 'src/app/helpers/util';
import { ProductService } from '../../shop/product.service';
import { Image } from 'src/app/models/image';
import { SubSink } from 'subsink';


@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss'],

})
export class TrendComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductService) { }
  private subs = new SubSink();
  trendImages: Image[];
  isLoading = true;


  ngOnInit() {
    this.getTrendItemsFromStore();
  }

  getTrendItemsFromStore() {
    this.subs.sink =
      this.productService.getShopFromStore()
        .subscribe(state => {
          this.trendImages = [... state.trendItems];
        });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }



}
