import { Currency } from './currency';

export class Coupon {
    constructor(
        private id: string,
        private title: string,
        private amount: Currency
    ) { }

    get Id() { return this.id; }
    get Title() { return this.title; }
    get Amount() { return this.amount; }

}