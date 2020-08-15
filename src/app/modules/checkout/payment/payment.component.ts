import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { PaymentType } from 'src/app/models/payment.model';
import { cartLabels } from 'src/app/util/app.labels';
import { CheckoutService } from '../checkout.service';
import { PaymentService } from './payment.service';
import { ToastService } from '../../shared/toasts/toast.service';
import { DialogService } from '../../shared/dialog/dialog.service';
import { Router } from '@angular/router';
import { RouteManagementService } from '../../main/route-management.service';

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
    private paymentService: PaymentService,
    private toaster: ToastService,
    private dialoger: DialogService,
    private rmgt: RouteManagementService
  ) { }

  ngOnInit(): void { }

  payNow() {
    this.paymentProgress = true;
    this.paymentService.pay(this.type)
      .subscribe(
        order => {
          console.log('payment done, order created', order);
          this.toaster.success('Order placed successfully');
          this.rmgt.routeToOrders();
        },
        (err) => {
          console.error('payment error ', err);
          this.dialoger.alert('Order was not successfull');
        },
        () => this.paymentProgress = false
      );
  }



}
