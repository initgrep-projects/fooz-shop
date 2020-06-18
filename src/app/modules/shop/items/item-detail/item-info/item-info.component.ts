import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { Product } from 'src/app/models/product';
import { SubSink } from 'subsink';
import { ItemDetailService } from '../item-detail.service';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent implements OnInit, OnDestroy, OnChanges {

  @Input() product: Product;
  grossItemPrice: number;
  private subs = new SubSink();
  constructor(private itemDetailService: ItemDetailService) { }

  ngOnInit(): void {
    this.grossItemPrice = this.product.Price.Amount;
    this.subs.sink =
      this.itemDetailService.quantityChange.subscribe(value => this.grossItemPrice = this.product.Price.Amount * value);
  }

  ngOnChanges() {
    this.grossItemPrice = this.product.Price.Amount;
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
