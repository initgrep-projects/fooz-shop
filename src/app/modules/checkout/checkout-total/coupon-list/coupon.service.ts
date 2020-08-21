import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Coupon } from 'src/app/models/coupon.model';
import { Currency } from 'src/app/models/currency';
import { AppState } from 'src/app/modules/main/store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { addSelectedCouponAction } from '../../store/checkout.actions';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  coupons$ = this.store.select('checkout').pipe(map(state => state.coupons));
  selectedCoupon$ = this.store.select('checkout').pipe(map(state => state.selectedCoupon));

  constructor(
    private store: Store<AppState>
  ) { }



  addSelectedCoupon(coupon: Coupon) {
    this.store.dispatch(addSelectedCouponAction({ coupon: coupon }));
  }

  availableCoupons$ = of([
    Coupon.fixed('FLEX100', '100 off on your next order', 100, 100, 1000, 2, new Date(2011, 10, 30).getTime()),
    Coupon.fixed('FLEX200', '100 off on your next order', 200, 100, 1000, 2, new Date(2011, 10, 30).getTime()),
    Coupon.fixed('FLEX300', '100 off on your next order', 300, 100, 1000, 2, new Date(2011, 10, 30).getTime()),
  ]);
}
