export class Category {
    constructor(
        private code: string,
        private label: string,
        private icon?: string
    ) { }

    get Code() { return this.code; }
    get Label() { return this.label; }

    set Icon(icon: string) { this.icon = icon; }
    get Icon() { return this.icon; }

    equals(category: Category): boolean{
        return this.code === category.code && this.label === category.label;
    }
}
