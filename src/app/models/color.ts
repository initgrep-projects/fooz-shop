export class Color {
    constructor(
        private name: string,
        private code: string,
        private selected: boolean = false) {
    }

    get Code() { return this.code; }
    get Name() { return this.name; }
    get isSelected() { return this.selected; }
    select() { this.selected = true; }
    deSelect() { this.selected = false; }
    equals(c: Color): boolean {
        return c.Code === this.code && c.Name === this.name;
    }
}