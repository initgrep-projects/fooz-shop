import { Component, OnInit, Input } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input('item') item: CartItem

  constructor() { }

  ngOnInit(): void {
    console.log("cartItem colors = ", this.item.Product.Colors);
  }

}
