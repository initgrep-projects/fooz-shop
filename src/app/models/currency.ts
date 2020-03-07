export class Currency {
    constructor(
       private code: string,
       private amount: number
    ) {}

    getCode() {
        return this.code;
    }

    getAmount() {
        return this.amount;
    }
}
