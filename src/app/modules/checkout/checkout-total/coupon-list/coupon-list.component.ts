import { Component, OnInit, OnDestroy } from '@angular/core';
import { Coupon, CouponType } from 'src/app/models/coupon.model';
import { Currency } from 'src/app/models/currency';
import { CouponService } from './coupon.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.scss']
})
export class CouponListComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  appliedCoupon: Coupon;

  constructor(
    public couponService: CouponService
  ) { }

  ngOnInit(): void {


    this.subs.sink =
      this.couponService.selectedCoupon$.subscribe(coupon => this.appliedCoupon = coupon);
  }



  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
