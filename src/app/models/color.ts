export class Color {
    // tslint:disable-next-line: variable-name
    constructor(private _name: string, private _code: string) {}

    get code() {
        return this._code;
    }
}