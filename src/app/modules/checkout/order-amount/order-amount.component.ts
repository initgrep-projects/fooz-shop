import { Component, OnDestroy, OnInit } from '@angular/core';
import { isEmpty } from 'lodash';
import { fadeIn } from 'src/app/animations/fadeAnimation';
import { cartLabels } from 'src/app/util/app.labels';
import { SubSink } from 'subsink';
import { CartService } from '../../cart/cart.service';
import { OrderService } from '../../account/orders/order.service';

@Component({
  selector: 'app-order-amount',
  templateUrl: './order-amount.component.html',
  styleUrls: ['./order-amount.component.scss'],
  animations: [
    fadeIn
  ]
})
export class OrderAmountComponent implements OnInit, OnDestroy {
  labels = cartLabels;
  private subs = new SubSink();
  totalPrice = 0;
  grossAmount = 0;
  itemQuantity = 0;
  deliveryFee = 0;
  currencyCode = 'QR';
  taxRate = 0.2;
  totalTax = 0;

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.calculateGrossAmount();
  }

  calculateGrossAmount() {
    this.subs.sink =
      this.orderService.orderCharges$.subscribe(({ itemPrice, tax, shipping }) => {
        this.totalPrice = itemPrice;
        this.grossAmount = itemPrice + tax + shipping;
        this.totalTax = tax;
        this.deliveryFee = shipping;
      });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
