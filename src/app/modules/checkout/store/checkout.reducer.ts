import { Action, createReducer, on } from '@ngrx/store';
import { AppMsg } from 'src/app/models/app-msg';
import { Coupon } from 'src/app/models/coupon.model';
import { addCouponsAction, addSelectedCouponAction } from './checkout.actions';
import { cloneDeep } from 'lodash';

export interface CheckoutState {
    coupons: Coupon[];
    selectedCoupon: Coupon;
    error: AppMsg;
}
export const initialState: CheckoutState = {
    coupons: null,
    selectedCoupon: null,
    error: null
}


const theReducer = createReducer(
    initialState,
    on(addCouponsAction, (state, { coupons }) => ({
        ...state,
        coupons: [...coupons]
    })),
    on(addSelectedCouponAction, (state, { coupon }) => ({
        ...state,
        selectedCoupon: cloneDeep(coupon)
    }))
);

export function CheckoutReducer(state: CheckoutState = initialState, action: Action) {
    return theReducer(state, action);
}