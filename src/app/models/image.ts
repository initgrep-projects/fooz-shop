import { Color } from './color';

export class Image {

    constructor(private url: string, private color: Color) { }

    get Color() { return this.color; }
    get Url() { return this.url; }
}
