export class Color {
    private selected: boolean;
    constructor(private name: string, private code: string) {
        this.selected = false;
    }

    getCode() {
        return this.code;
    }

    getName() {
        return this.name;
    }

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