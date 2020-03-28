export class Size {
    private selected: boolean;
    constructor(private label: string, private letter: string) {
        this.selected = false;
    }

    getLabel() { return this.label; }
    getLetter() { return this.letter; }

    isSelected() {
        return this.selected;
    }

    select() {
        this.selected = true;
    }
    deSelect() {
        this.selected = false;
    }
}