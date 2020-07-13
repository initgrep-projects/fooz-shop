import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { CartItem } from 'src/app/models/cartItem';
import { cartLabels } from 'src/app/util/app.labels';
import { fadeIn, staggerFadeIn } from 'src/app/animations/fadeAnimation';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss'],
  animations:[
    fadeIn,
    staggerFadeIn
  ]
})
export class CartViewComponent implements OnInit {
  labels = cartLabels;
  constructor(public cartService: CartService) { }

  ngOnInit(): void {
  }

  updateCartItem(item: CartItem) {
    this.cartService.updateCartItem(item);
    this.cartService.updateProductQuantity(item.Product, item.SelectedQuantity);
  }

  removeItem(id: string) {
    this.cartService.deleteItem(id);
  }
}
