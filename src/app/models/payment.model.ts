import { Currency } from './currency';

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

}