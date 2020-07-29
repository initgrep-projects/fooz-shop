import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cloneDeep } from 'lodash';
import { Product } from 'src/app/models/product';
import { SubSink } from 'subsink';
import { ItemDetailService } from './item-detail.service';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit, OnDestroy, OnChanges {

  product: Product;
  subs = new SubSink();

  constructor(
    private route: ActivatedRoute,
    private itemdetailSerive: ItemDetailService,
    public productService: ProductService
  ) { }

  ngOnInit(): void {
    this.recieveProductFromResolver();
  }

  ngOnChanges(){
    console.log('onChanges product => ', this.product);
  }

  recieveProductFromResolver() {
    this.subs.sink =
      this.route.data.subscribe(data => {
        this.product = cloneDeep(data.product);
        this.itemdetailSerive.dispatchProduct(this.product);
      });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
