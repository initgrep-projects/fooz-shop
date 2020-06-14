import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CartService } from './cart.service';
import { SubSink } from 'subsink';
import { AuthMessages } from '../../helpers/constants';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  labels = AuthMessages.authAnchorLabels;
  cartItemSize = 0;
  private subs = new SubSink();

  @ViewChild('cartContent') cartContentRef: ElementRef;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.dispatchCartItemsOnUserChange();
    this.getCartSize();
  }


  getCartSize() {
    console.log('cart size fetched from cart-component');
    this.subs.sink = this.cartService.getCartFromStore()
      .subscribe(cart => {
        console.log('cart = ', cart);
        this.cartItemSize = cart.length
      });
  }

  /** load the new items */
  dispatchCartItemsOnUserChange() {
    this.subs.sink = this.cartService.dispatchCartItemsToStore()
    .subscribe();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
