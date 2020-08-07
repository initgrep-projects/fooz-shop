import { Currency } from './currency';
import { generateGuid } from '../util/app.lib';

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
        private amount: Currency,
        private type: PaymentType,
        private createdOn: number = new Date().getTime()
    ) {
    }

    get Id() { return this.id; }
    // set Id(id: string) { this.id = id; }
    get OrderId() { return this.orderId; }
    set OrderId(oid: string) { this.orderId = oid; }
    get Amount() { return this.amount; }
    set Amount(a: Currency) { this.amount = a; }
    get Type() { return this.type; }
    set Type(pt: PaymentType) { this.Type = pt; }

    get CreatedOn() { return this.createdOn; }
    set CreatedOn(co: number) { this.createdOn = co; }


    static create(type: PaymentType, orderId: string, amount: Currency) {
        let payment: Payment = null;
        switch (type) {
            case PaymentType.CREDIT_CARD:
                payment = new Payment(generateGuid(), orderId, amount, PaymentType.CREDIT_CARD);
                break;
            case PaymentType.DEBIT_CARD:
                payment = new Payment(generateGuid(), orderId, amount, PaymentType.DEBIT_CARD);
                break;
            case PaymentType.NET_BANKING:
                payment = new Payment(generateGuid(), orderId, amount, PaymentType.NET_BANKING);
                break;
            default:
                payment = new Payment(generateGuid(), orderId, amount, PaymentType.OTHER);
                break;
        }
        return payment;
    }

}