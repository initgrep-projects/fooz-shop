export class Color {
    constructor(private name: string, private code: string) {}

    getCode() {
        return this.code;
    }

    getName(){
        return this.name;
    }
}