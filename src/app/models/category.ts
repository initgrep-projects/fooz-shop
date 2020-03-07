export class Category{
    constructor(
    private code: string,
    private label: string
    ) {}

    getCode() { return this.code; }
    getLabel() {return this.label; }
}