export class Size {
    constructor(
        private label: string,
        private letter: string,
        private selected: boolean = false) {
    }

    get Label() { return this.label; }
    get Letter() { return this.letter; }
    get isSelected() { return this.selected; }
    select() { this.selected = true; }
    deSelect() { this.selected = false; }
    equals(s: Size): boolean {
        console.log("size equla ",s.label === this.label && s.letter === this.letter);
        return s.label === this.label && s.letter === this.letter;
    }
}
