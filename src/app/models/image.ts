import { Color } from './color';

export class Image {

    constructor(private url: string, private color: Color) {}

    getUrl() {
        return this.url;
    }
}
