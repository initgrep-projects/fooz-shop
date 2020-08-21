import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Coupon, CouponType } from 'src/app/models/coupon.model';
import { AppState } from 'src/app/modules/main/store/app.reducer';
import { addSelectedCouponAction } from '../../store/checkout.actions';
import { cloneDeep } from 'lodash';

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

  /**
   * calculate the coupon finalValue based on the type
   * Note: We do not take all the constraints here ;
   * the constraints will be checked after fetching the relative coupons before showing it to client
   * @param cartAmount 
   */
  couponFinalValue(cartAmount: number): Observable<Coupon> {
    return this.selectedCoupon$
      .pipe(
        map(c => {
          let finalVal = 0;
          if (!!c) {
            const coupon = cloneDeep(c);
            if (coupon.Type === CouponType.FIXED_VALUE) {
              finalVal = coupon.Value;
            } else if (coupon.Type === CouponType.PERCENT_VALUE) {
              console.log("percent coupon = ", coupon);
              const couponPercentValue = (coupon.Value / 100) * cartAmount
              finalVal = couponPercentValue > coupon.MaxValue ? coupon.MaxValue : couponPercentValue;
            }

            coupon.FinalValue = finalVal;
            return coupon;
          }
          return c; // would be always null
        })
      )
  }

  /**
   * available coupons would be constructed based on the contraints and the order amount and usage count
   */
  availableCoupons$ = of([
    // Coupon.fixed('FLAT100', '100 off on your next order', 100, 100, 1000, 2, new Date(2011, 10, 30).getTime()),
    Coupon.fixed('FLAT200', '200 off on your next order', 200, 100, 1000, 2, new Date(2011, 10, 30).getTime()),
    // Coupon.fixed('FLAT300', '300 off on your next order', 300, 100, 1000, 2, new Date(2011, 10, 30).getTime()),
    Coupon.percentage('FLEX10', '10% off on your next order. Max value 400', 10, 400, 3000, 2, new Date(2011, 10, 30).getTime())
  ]);
}
