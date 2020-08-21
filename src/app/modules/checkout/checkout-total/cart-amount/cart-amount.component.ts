import { Component, OnDestroy, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/animations/fadeAnimation';
import { cartLabels } from 'src/app/util/app.labels';
import { SubSink } from 'subsink';

import { Coupon } from 'src/app/models/coupon.model';
import { Currency } from 'src/app/models/currency';
import { CheckoutService } from '../../checkout.service';

@Component({
  selector: 'app-cart-amount',
  templateUrl: './cart-amount.component.html',
  styleUrls: ['./cart-amount.component.scss'],
  animations: [
    fadeIn
  ]
})
export class CartAmountComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  labels = cartLabels;
  orderQuantity = 0;
  currencyCode = '';
  deliveryFee = 0;
  totalTax = 0;
  discount: Coupon;
  totalPrice = 0;
  grossAmount = 0;



  constructor(
    private cs: CheckoutService
  ) { }

  ngOnInit(): void {
    this.calculateOrderQuantity();
    this.calculateGrossAmount();

  }

  calculateGrossAmount() {
    this.subs.sink =
      this.cs.orderCharges$.subscribe(({ itemPrice, tax, shipping, coupon }) => {
        console.log('order amount calculated ', itemPrice, tax, shipping);
        this.currencyCode = itemPrice.Code;
        this.totalPrice = itemPrice.Amount;
        this.grossAmount = this.calculateGrossPrice(itemPrice, tax, shipping, coupon);
        this.totalTax = tax.Amount;
        this.discount = coupon;
        this.deliveryFee = shipping.Amount;
      });
  }

  calculateGrossPrice(itemPrice: Currency, tax: Currency, shipping: Currency, coupon: Coupon) {
    const price = itemPrice.Amount + tax.Amount + shipping.Amount;
    if (!coupon) {
      return price;
    }
    //to be caluculated by coupon logic
    return price - coupon.Value;

  }
  calculateOrderQuantity() {
    this.subs.sink = this.cs.orderSize$.subscribe(size => this.orderQuantity = size);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
