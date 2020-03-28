import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-item-buy',
  templateUrl: './item-buy.component.html',
  styleUrls: ['./item-buy.component.scss']
})
export class ItemBuyComponent implements OnInit {

  @Input() product: Product;
  constructor() { }

  ngOnInit(): void {
  }

  addToCart() {
    console.log('added to cart ', this.product);
  }

}
