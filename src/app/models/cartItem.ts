import { Product } from './product';

export class CartItem {
    constructor(
        private userId: string,
        private product: Product,
        private quantity: number) { }

    get UserId() { return this.userId; }
    set UserId(userId: string) { this.userId = userId; }

    get Product() { return this.product; }
    set Product(product: Product) { this.product = product; }

    get Quantity() { return this.quantity; }
    set Quantity(quantity: number) { this.quantity = quantity; }
}