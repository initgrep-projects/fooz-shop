import { CustomSize } from './custom-size';
import { Image } from './image';
import { Color } from './color';
import { Size } from './size';
import { Category } from './category';
import { Currency } from './currency';

export class Product {

    name: string;
    id: string;
    description: string;
    quantity: number;
    timeStamp: number;
    price: Currency;
    category: Category;
    images: Image[];
    colors: Color[];
    sizes: Size[];
    customSize: CustomSize;

    constructor(name: string,
                id: string,
                description: string,
                quantity: number,
                timeStamp: number,
                price: Currency,
                category: Category,
                images: Image[],
                sizes: Size[]
    ) {
        this.name = name;
        this.id = id;
        this.description = description;
        this.category = category;
        this.quantity = quantity;
        this.timeStamp = timeStamp;
        this.price = price;
        this.images = images;
        this.sizes = sizes;
        this.colors = this.getColorsFromImages();
    }
    addCustomSize(customSize: CustomSize) {
        this.customSize = customSize;
    }

    private getColorsFromImages(): Color[] {
        const colors: Color[] = [];
        this.images.forEach((image) => {
            const c = image.getColor();
            if (colors.indexOf(c) < 0 ) {
                colors.push(c);
            } 
        });
        console.log('colors = ', colors);
        return colors;
    }
}
