import { Color } from './color';

export class Image {

    constructor(private url: string, private color: Color) {}

    getColor(){
        return this.color;
    }
    getUrl(){
        return this.url;
    }
}
