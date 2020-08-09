import { Currency } from './currency';
import { generateGuid } from '../util/app.lib';
import { Coupon } from './coupon.model';

export enum PaymentType {
    CREDIT_CARD = 'CREDIT_CARD',
    DEBIT_CARD = 'DEBIT_CARD',
    NET_BANKING = 'NET_BANKING',
    OTHER = 'OTHER'
}

export class Payment {
    constructor(
        private id: string,
        private orderId: string,
        private price: Currency,
        private shipping: Currency,
        private tax: Currency,
        private type: PaymentType,
        private coupon: Coupon = null,
        private createdOn: number = new Date().getTime()
    ) {
    }

    get Id() { return this.id; }
    // set Id(id: string) { this.id = id; }
    get OrderId() { return this.orderId; }
    set OrderId(oid: string) { this.orderId = oid; }
    get Price() { return this.price; }
    set Price(a: Currency) { this.price = a; }

    get Shipping() { return this.shipping; }

    get Tax() { return this.tax; }

    get Type() { return this.type; }
    set Type(pt: PaymentType) { this.Type = pt; }

    get Coupon() { return this.coupon; }

    get CreatedOn() { return this.createdOn; }
    set CreatedOn(co: number) { this.createdOn = co; }


    static create(type: PaymentType, orderId: string, amount: Currency, shipping: Currency, tax: Currency, coupon?: Coupon) {
        let payment: Payment = null;
        const paymentId = generateGuid();
        switch (type) {
            case PaymentType.CREDIT_CARD:
                payment = new Payment(paymentId, orderId, amount, shipping, tax, PaymentType.CREDIT_CARD, coupon);
                break;
            case PaymentType.DEBIT_CARD:
                payment = new Payment(paymentId, orderId, amount, shipping, tax, PaymentType.DEBIT_CARD, coupon);
                break;
            case PaymentType.NET_BANKING:
                payment = new Payment(paymentId, orderId, amount, shipping, tax, PaymentType.NET_BANKING, coupon);
                break;
            default:
                payment = new Payment(paymentId, orderId, amount, shipping, tax, PaymentType.OTHER, coupon);
                break;
        }
        return payment;
    }

}