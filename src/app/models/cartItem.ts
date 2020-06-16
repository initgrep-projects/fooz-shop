import { Product } from './product';
import { Color } from './color';
import { Size } from './size';
import { CustomSize } from './custom-size';
import { Category } from './category';

export class CartItem {
    constructor(
        private id?: string,
        private createdDate?: number,
        private userId?: string,
        private isAnonymousUser?: boolean,
        private product?: Product,
        private selectedQuantity?: number,
        private selectedColor?: Color,
        private selectedSize?: Size,
        private selectedCustomSize?: CustomSize,
        private selectedCategory?: Category,
    ) { }

    get UserId() { return this.userId; }
    set UserId(userId: string) { this.userId = userId; }

    get IsAnonymousUser() { return this.isAnonymousUser; }
    set IsAnonymousUser(iau: boolean) { this.isAnonymousUser = iau; }

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
    set Id(id: string) { this.id = id; }

    get CreatedDate() { return this.createdDate; }
    set CreatedDate(t: number) { this.createdDate = t; }

    equals(_item: CartItem): boolean {

        // console.log(" user_ids equal ?", _item.userId === this.userId);
        // console.log("selected size = ", this.selectedSize, _item.selectedSize, this.isEqualSize(_item.SelectedSize));
        // console.log("selected customSize ", this.SelectedCustomSize, _item.selectedCustomSize, this.isEqualCustomSize(_item.SelectedCustomSize));
        // console.log('selected catgeory = ', _item.SelectedCategory.equals(this.SelectedCategory));

        const result = _item.userId === this.userId
            && this.isEqualSize(_item.SelectedSize)
            && this.isEqualCustomSize(_item.SelectedCustomSize)
            && _item.SelectedColor.equals(this.SelectedColor)
            && _item.SelectedCategory.equals(this.SelectedCategory)
            && _item.Product.equals(this.Product);
        console.log("isItem equal ", result);

        return result;
    }


    private isEqualSize(selectedSize: Size) {
        if (!this.SelectedSize && !selectedSize) {
            return true;
        }
        if (!this.SelectedSize || !selectedSize) {
            return false;
        }
        return this.SelectedSize.equals(selectedSize);

    }

    private isEqualCustomSize(selectedCustomSize: CustomSize) {
        if (!this.SelectedCustomSize && !selectedCustomSize) {
            return true;
        }
        if (!this.SelectedCustomSize || !selectedCustomSize) {
            return false;
        }
        return this.SelectedCustomSize.equals(selectedCustomSize);

    }

}