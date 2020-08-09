import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Coupon } from 'src/app/models/coupon.model';
import { Currency } from 'src/app/models/currency';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor() { }

  getVerifiedCoupon() {
    /** from the store, get the eligible coupon for the user and sale */
    return of(new Coupon('DEMO123', 'Demo Coupon for your sale', Currency.QAR(200)));
  }
}
