import { Component, OnInit, Input } from '@angular/core';
import { ItemDetailService } from '../item-detail.service';

@Component({
  selector: 'app-item-quantity',
  templateUrl: './item-quantity.component.html',
  styleUrls: ['./item-quantity.component.scss']
})
export class ItemQuantityComponent implements OnInit {

  quantity = 0;
  constructor( private itemdetailService: ItemDetailService) { }

  ngOnInit(): void {
    this.increment();
  }


  increment() {
    if (this.quantity < 10) {
       this.quantity++;
       this.itemdetailService.setSelectedQuantity(this.quantity);
    }
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
      this.itemdetailService.setSelectedQuantity(this.quantity);
    }
  }

}
