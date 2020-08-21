import { Component, OnDestroy, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/animations/fadeAnimation';
import { CartItem } from 'src/app/models/cart-item';
import { cartLabels } from 'src/app/util/app.labels';
import { SubSink } from 'subsink';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss'],
  animations: [
    fadeIn
  ]
})
export class CartViewComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  labels = cartLabels;
  constructor(
    public cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  updateCartItem(item: CartItem) {
    this.subs.sink =
      this.cartService.updateCartItem(item).subscribe(
        ok => {
          if (ok) {
            this.cartService.updateProductQuantity(item.Product, item.SelectedQuantity);
          }
        }
      );
  }

  removeItem(id: string) {
    this.subs.sink =
      this.cartService.deleteItem(id).subscribe();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
