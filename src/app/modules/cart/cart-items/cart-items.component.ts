import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent implements OnInit, OnDestroy {

  cart: Product[] = [];
  private subs: Subscription[] = [];

  constructor(
    private cartService: CartService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.getCart();
  }

  /**
   * get the cart items from the store
   */
  getCart() {
    this.subs[this.subs.length + 1] =
      this.cartService.getCartFromStore()
        .subscribe(state => {
          this.cart = state.cart;
        });
  }

  closeModal() {
    this.activeModal.dismiss();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
