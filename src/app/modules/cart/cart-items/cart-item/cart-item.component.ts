import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input('item') item: CartItem
  @Output() deleteItem = new EventEmitter<string>();

  grossItemPrice: number;

  constructor() { }

  ngOnInit(): void {
    console.log("cartItem colors = ", this.item.Product.Colors);
    this.grossItemPrice = this.item.Product.Price.Amount * this.item.SelectedQuantity;
  }

  onQuantityChange(q: number){
    this.item.SelectedQuantity = q;
    this.grossItemPrice = this.item.Product.Price.Amount * this.item.SelectedQuantity;
  }

  removeItem(){
    this.deleteItem.emit(this.item.Id);
  }


}
