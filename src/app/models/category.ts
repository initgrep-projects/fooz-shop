export class Category {
    private icon: string;
    constructor(
    private code: string,
    private label: string

    ) {}

    getCode() { return this.code; }
    getLabel() {return this.label; }

    seticon(icon: string) {
        this.icon = icon;
    }

    getIcon() {
        return this.icon;
    }
}