import { CustomSize } from './custom-size';
import { Image } from './image';
import { Color } from './color';
import { Size } from './size';
import { Category } from './category';
import { Currency } from './currency';

export class Product {

    private name: string;
    private id: string;
    private description: string;
    private availableQuantity: number;
    private timeStamp: number;
    private price: Currency;
    private category: Category;
    private images: Image[];
    private colors: Color[];
    private sizes: Size[];
    private customSize: CustomSize;

    constructor(name: string,
                id: string,
                description: string,
                availableQuantity: number,
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
        this.availableQuantity = availableQuantity;
        this.timeStamp = timeStamp;
        this.price = price;
        this.images = images;
        this.sizes = sizes;
        this.colors = this.getColorsFromImages();
    }

    private getColorsFromImages(): Color[] {
        const colors: Color[] = [];
        this.images.forEach((image) => {
            const c = image.getColor();
            const isNotPresent = colors.findIndex(color => color.getCode() === c.getCode()) < 0;
            if (isNotPresent) {
                colors.push(c);
            }
        });
        return colors;
    }


    get Name() { return this.name; }
    set Name(name: string) { this.name = name; }
    get Id() { return this.id; }
    set Id(id: string) { this.id = id; }
    get Description() { return this.description; }
    set Description(description: string) { this.description = description; }
    get AvailableQuantity() { return this.availableQuantity; }
    set AvailableQuantity(quantity: number) { this.availableQuantity = quantity; }
    get TimeStamp() { return this.timeStamp; }
    set TimeStamp(timestamp: number) { this.timeStamp = timestamp; }
    get Price() { return this.price; }
    set Price(price: Currency) { this.price = price; }
    get Category() { return this.category; };
    set Category(category: Category) { this.category = category; }
    get Images() { return this.images; }
    set Images(images: Image[]) { this.images = images; }
    get Colors() { return this.colors; }
    set Colors(colors: Color[]) { this.colors = colors; }
    get Sizes() { return this.sizes; }
    set Sizes(sizes: Size[]) { this.sizes = sizes; }
    set CustomSize(customSize: CustomSize) { this.customSize = customSize; }
    get CustomSize() { return this.customSize; }

}
