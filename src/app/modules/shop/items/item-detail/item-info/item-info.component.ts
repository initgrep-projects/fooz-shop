import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product';
import { SubSink } from 'subsink';
import { ItemDetailService } from '../item-detail.service';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent implements OnInit, OnDestroy {
  
  @Input() product: Product;
  grossItemPrice:number;
  private subs = new SubSink();
  constructor(private itemDetailService:ItemDetailService) { }

  ngOnInit(): void {
    console.log('price before ', this.product.Price.Amount);
    this.grossItemPrice = this.product.Price.Amount;
    console.log('price after ', this.product.Price.Amount, this.grossItemPrice);
    // this.subs.sink = 
    this.itemDetailService.quantityChange.subscribe(value => this.grossItemPrice = this.product.Price.Amount * value);
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }
}
