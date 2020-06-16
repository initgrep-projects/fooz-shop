import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemDetailService } from './item-detail.service';
import {SubSink} from 'subsink';
import { cloneDeep } from 'lodash';

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
    private itemdetailSerive: ItemDetailService
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
