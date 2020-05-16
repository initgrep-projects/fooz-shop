export class Currency {
    constructor(
       private code: string,
       private amount: number
    ) {}

    get Code() {return this.code; }
    get Amount() {return this.amount;}
}
