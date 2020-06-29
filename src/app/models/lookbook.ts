import { Image } from './image';

export class LookBookItem {
    constructor(
        private image: Image,
        private label: string
    ) { }

    get Label() { return this.label; }
    set Label(label: string) { this.label = label; }

    get Image() { return this.image; }
    set Image(i: Image) { this.image = i; }

}