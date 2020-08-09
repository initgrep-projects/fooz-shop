import { Component, OnDestroy, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/animations/fadeAnimation';
import { cartLabels } from 'src/app/util/app.labels';
import { SubSink } from 'subsink';
import { CheckoutService } from '../checkout.service';

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
  totalPrice = 0;
  grossAmount = 0;
  orderQuantity = 0;
  deliveryFee = 0;
  currencyCode = '';
  totalTax = 0;


  constructor(
    private cs: CheckoutService
  ) { }

  ngOnInit(): void {
    this.calculateOrderQuantity();
    this.calculateGrossAmount();
  }

  calculateGrossAmount() {
    this.subs.sink =
      this.cs.orderCharges$.subscribe(({ itemPrice, tax, shipping }) => {
        console.log('order amount calculated ', itemPrice, tax, shipping);
        this.currencyCode = itemPrice.Code;
        this.totalPrice = itemPrice.Amount;
        this.grossAmount = itemPrice.Amount + tax.Amount + shipping.Amount;
        this.totalTax = tax.Amount;
        this.deliveryFee = shipping.Amount;
      });
  }

  calculateOrderQuantity() {
    this.subs.sink = this.cs.orderSize$.subscribe(size => this.orderQuantity = size);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
