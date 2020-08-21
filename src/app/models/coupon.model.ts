import { Currency } from './currency';

export enum CouponType {
    FIXED_VALUE = "FIXED_VALUE",
    PERCENT_VALUE = "PERCENT_VALUE"
}


export class Coupon {
    constructor(
        private code: string,
        private title: string,
        private type: CouponType,
        private value: number,
        private maxValue: number,
        private minOrderAmount: number,
        private usageCount: number = 0,
        private endDate: number,
        private startDate: number = Date.now(),
    ) { }


    get Code() { return this.code; }
    set Code(c: string) { this.code = c; }
    get Title() { return this.title; }
    set Title(t: string) { this.title = t; }
    get Type() { return this.type; }
    set Type(v: CouponType) { this.type = v; }
    get Value() { return this.value; }
    set Value(v: number) { this.value = v; }
    get MaxValue() { return this.maxValue; }
    set MaxValue(m: number) { this.maxValue = m; }
    get MinOrderAmount() { return this.minOrderAmount; }
    set MinOrderAmount(m: number) { this.minOrderAmount = m; }
    get EndDate() { return this.endDate; }
    set EndDate(date: number) { this.endDate = date; }
    get UsageCount() { return this.usageCount; }
    set UsageCount(count: number) { this.usageCount = count; }
    get StartDate() { return this.startDate; }
    set StartDate(date: number) { this.startDate = date; }

    static fixed(code: string, title: string, couponValue: number, maxCouponValue: number, minOrderAmount: number, endDate: number, usageCount: number, startDate: number = Date.now()) {
        return new Coupon(
            code,
            title,
            CouponType.FIXED_VALUE,
            couponValue,
            maxCouponValue,
            minOrderAmount,
            usageCount,
            endDate,
            startDate
        );
    }

    static percentage(code: string, title: string, percentCouponValue: number, maxCouponValue: number, minOrderAmount: number, endDate: number, usageCount: number, startDate: number = Date.now()) {
        return new Coupon(
            code,
            title,
            CouponType.PERCENT_VALUE,
            percentCouponValue,
            maxCouponValue,
            minOrderAmount,
            usageCount,
            endDate,
            startDate
        );
    }
}