import { CustomSize } from './custom-size';
import { Image } from './image';
import { Color } from './color';
import { Size } from './size';
import { Category } from './category';

export class Product {

     name: string;
     id: string;
     description: string;
     quantity: number;
     category: Category;
     images: Image[];
     colors: Color[];
     size: Size[];
     customSize: CustomSize;

    constructor(name: string,
                id: string,
                description: string,
                quantity: number,
                category: Category,
                images: Image[],
                colors: Color[],
                size: Size[]
    ) {
        this.name = name;
        this.id = id;
        this.description = description;
        this.category = category;
        this.quantity = quantity;
        this.images = images;
        this.colors = colors;
        this.size = size;
    }
    addCustomSize(customSize: CustomSize) {
        this.customSize = customSize;
    }
}
