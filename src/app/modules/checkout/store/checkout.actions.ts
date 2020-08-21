import { createAction, props } from '@ngrx/store';
import { Coupon } from 'src/app/models/coupon.model';

export const loadCouponsAction = createAction(
    '[checkout] load coupons'
);
export const addCouponsAction = createAction(
    '[checkout] add coupons',
    props<{ coupons: Coupon[] }>()
);
export const addSelectedCouponAction = createAction(
    '[checkout] add selected coupon',
    props<{ coupon: Coupon }>()
);