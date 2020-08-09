import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, mapTo, take, switchMap } from 'rxjs/operators';
import { CheckoutService } from '../checkout.service';
import { PaymentType } from 'src/app/models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private checkoutService: CheckoutService
  ) { }

  pay(type: PaymentType) {
    return of(null).pipe(take(1), delay(3000), mapTo(true))
      .pipe(
        switchMap(ok => this.checkoutService.createOrder(type))
      )
  }

}
