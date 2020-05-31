import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from '../../cart.service';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() item: CartItem;

  grossItemPrice: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.item = cloneDeep(this.item);
    this.incrementPrice();
  }

  onQuantityChange(q: number) {
    console.log('quanitity change -> ', q);
    this.item.SelectedQuantity = q;
    this.incrementPrice();
    this.cartService.updateCartItem(this.item);
    this.cartService.updateProductQuantity(this.item.Product,q);
  }
  private incrementPrice() {
    this.grossItemPrice = this.item.Product.Price.Amount * this.item.SelectedQuantity;
  }

  removeItem() {
    this.cartService.deleteItem(this.item.Id);
  }


}
