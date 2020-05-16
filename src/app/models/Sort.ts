export class Sort {
    constructor(
        private type: string,
        private label: string,
        private icon: string) { }

    get Type() { return this.type; }
    get Label() { return this.label; }
    get Icon() { return this.icon; }
}