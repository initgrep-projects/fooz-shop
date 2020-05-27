import { Product } from './product';
import { Color } from './color';
import { Size } from './size';
import { CustomSize } from './custom-size';
import { Category } from './category';
import { generateGuid } from '../helpers/util';

export class CartItem {
    constructor(
        private id: string = generateGuid(),
        private userId?: string,
        private product?: Product,
        private selectedQuantity?: number,
        private selectedColor?: Color,
        private selectedSize?: Size,
        private selectedCustomSize?: CustomSize,
        private selectedCategory?: Category,
    ) { }

    get UserId() { return this.userId; }
    set UserId(userId: string) { this.userId = userId; }

    get Product() { return this.product; }
    set Product(product: Product) { this.product = product; }

    get SelectedQuantity() { return this.selectedQuantity; }
    set SelectedQuantity(quantity: number) { this.selectedQuantity = quantity; }

    get SelectedColor() { return this.selectedColor; }
    set SelectedColor(c: Color) { this.selectedColor = c; }

    get SelectedSize() { return this.selectedSize; }
    set SelectedSize(s: Size) { this.selectedSize = s; }

    get SelectedCustomSize() { return this.selectedCustomSize; }
    set SelectedCustomSize(cz: CustomSize) { this.selectedCustomSize = cz; }

    get SelectedCategory() { return this.selectedCategory; }
    set SelectedCategory(cat: Category) { this.selectedCategory = cat; }

    get Id() { return this.id; }

    equals(_item: CartItem): boolean {
       
        console.log(" user_ids equal ?", _item.userId === this.userId);
        return _item.userId === this.userId
            && (!!_item.SelectedSize && !!this.SelectedSize) ? _item.SelectedSize.equals(this.SelectedSize) : false
                && (!!_item.SelectedCustomSize && !!this.SelectedCustomSize) ? _item.selectedCustomSize.equals(this.selectedCustomSize) : false
                && _item.SelectedColor.equals(this.SelectedColor)
                && _item.SelectedCategory.equals(this.SelectedCategory)
                && _item.Product.equals(this.Product);
    }

}