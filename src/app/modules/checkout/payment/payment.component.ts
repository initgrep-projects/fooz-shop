import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { PaymentType } from 'src/app/models/payment.model';
import { cartLabels } from 'src/app/util/app.labels';
import { CheckoutService } from '../checkout.service';
import { PaymentService } from './payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  labels = cartLabels;
  paymentProgress = false;
  type = PaymentType.CREDIT_CARD;

  constructor(
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void { }

  payNow() {
    this.paymentProgress = true;
    this.paymentService.pay(this.type)
      .subscribe(
        order => console.log('payment done, order created', order),
        (err) => console.error('payment error ', err),
        () => this.paymentProgress = false
      );
  }



}
