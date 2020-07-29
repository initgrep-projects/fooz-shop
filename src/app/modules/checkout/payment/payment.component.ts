import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { cartLabels } from 'src/app/util/app.labels';
import { BraintreeService } from '../braintree.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewInit {
  labels = cartLabels;
  cart: CartItem[];


  constructor(
    private braintreeService: BraintreeService
  ) { }

  ngAfterViewInit(): void {
    this.braintreeService.initiateDropInUI$.subscribe(event => console.log('onRequestable', event));
  }

  ngOnInit(): void {}

  payNow() {
    this.braintreeService.requestPaymentMethodNonce$
      .subscribe(
        payload => console.log('payload => ', payload),
        error => console.log('error => ', error)
      );
  }



}
