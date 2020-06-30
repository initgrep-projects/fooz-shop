import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../shop/product.service';
import { Image } from 'src/app/models/image';
import { SubSink } from 'subsink';
import { fadeIn } from 'src/app/animations/fadeAnimation';


@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss'],
  animations:[
    fadeIn
  ]
})
export class TrendComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductService) { }
  private subs = new SubSink();
  
  isLoading = true;


  ngOnInit() {
    // this.getTrendItemsFromStore();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }



}
