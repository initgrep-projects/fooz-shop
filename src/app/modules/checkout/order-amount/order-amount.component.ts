import { Component, OnDestroy, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/animations/fadeAnimation';
import { cartLabels } from 'src/app/util/app.labels';
import { SubSink } from 'subsink';
import { CheckoutService } from '../checkout.service';
import { Coupon } from 'src/app/models/coupon.model';
import { Currency } from 'src/app/models/currency';

@Component({
  selector: 'app-order-amount',
  templateUrl: './order-amount.component.html',
  styleUrls: ['./order-amount.component.scss'],
  animations: [
    fadeIn
  ]
})
export class OrderAmountComponent implements OnInit, OnDestroy {
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
    return price - coupon.Amount.Amount;

  }
  calculateOrderQuantity() {
    this.subs.sink = this.cs.orderSize$.subscribe(size => this.orderQuantity = size);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
