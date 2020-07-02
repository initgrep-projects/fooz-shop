import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { AuthMessages } from '../../util/app.labels';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  labels = AuthMessages.authAnchorLabels;
  private subs = new SubSink();

  constructor(
    public cartService: CartService
  ) { }

  ngOnInit(): void {
    this.loadCartOnUserChange();
  }

  /** load the new items */
  loadCartOnUserChange() {
    this.subs.sink = this.cartService.loadCartItemsOnUserChange()
    .subscribe();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
