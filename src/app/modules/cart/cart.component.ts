import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CartService } from './cart.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  cartItemSize = 0;
  private subs = new SubSink();

  @ViewChild('cartContent') cartContentRef: ElementRef;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getCartSize();
    this.dispatchCartItemsToCartStore();
  }


  getCartSize() {
    this.subs.sink = this.cartService.getCartFromStore()
      .subscribe(state => this.cartItemSize = state.cart.length );
  }

  dispatchCartItemsToCartStore() {
    this.subs.sink = this.cartService.dispatchCartItemsToStore().subscribe();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
