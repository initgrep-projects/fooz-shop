import { Component, OnInit, Input } from '@angular/core';
import { ItemDetailService } from '../item-detail.service';

@Component({
  selector: 'app-item-quantity',
  templateUrl: './item-quantity.component.html',
  styleUrls: ['./item-quantity.component.scss']
})
export class ItemQuantityComponent implements OnInit {

  quantity = 1;
  constructor( private itemdetailService: ItemDetailService) { }

  ngOnInit(): void {}

  onValueChange(value:number) {
       this.itemdetailService.setSelectedQuantity(value);
  }

}
