import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Coupon, CouponType } from 'src/app/models/coupon.model';
import { AppState } from 'src/app/modules/main/store/app.reducer';
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
   * //DECIDE IF THE VALIATION SHOULD BE DONE INSIDE EFFECTS.
   * // THAT WOULD MAKE SURE, THE VALIDATION HAPPENS ONLY ONCE
   *  // HOWEVER, IF THE CART AMOUNT CHANGES, WE SHOULD BE DOING VALIDATION ON (CART AMOUNT CHANGE)
   *      // HENCE, IT IS NECESSARY TO DO THE VALIDATION EVERYTIME THE CART AMOUNT CHANGES.
   * 
   * 1)fetch available coupons using effects,
   * 2) fetch coupon usage statistics using effects,
   * 3) validate coupons based on cart amount and usage count
   */
  availableCoupons$ = of([
    Coupon.fixed('FLAT100', '100 off on your next order', 100, 100, 1000, 3, new Date(2020, 10, 30).getTime()),
    Coupon.fixed('FLAT200', '200 off on your next order', 200, 100, 1000, 1, new Date(2020, 10, 30).getTime()),
    Coupon.fixed('FLAT300', '300 off on your next order', 300, 100, 1000, 2, new Date(2020, 10, 30).getTime()),
    Coupon.percentage('FLEX10', '10% off on your next order. Max value 400', 10, 400, 3000, 3, new Date(2020, 10, 30).getTime())
  ]).
    pipe(
      take(1),
      tap(coupons => console.log("availableCoupons -> ", coupons))
      // map(coupons => coupons.filter(c => this.validateCoupon(c, 3000, 2)))
    );


  /**
   * @todo -> use case -:
   *  1-> user adds items to checkout
   *  2-> fetch users existing records of coupons -- TO be done
   *  3-> validate the current order amount and past usage occurances of couponse
   * validate coupon based on the constraints specified
   * @param coupon Coupon
   * @param orderAmount cart amount without tax and shipping
   * @param usageCount number of times the coupon has been used by the user
   */
  validateCoupon(coupon: Coupon, orderAmount: number, usageCount: number) {
    if (!!coupon && coupon.IsActive) {
      if (orderAmount < coupon.MinOrderAmount) {
        return false;
      }
      else if (usageCount >= coupon.UsageCount) {
        return false;
      }
      else if (coupon.EndDate < Date.now()) {
        return false;
      }
      else {
        return true;
      }
    }
    return false;
  }

}
