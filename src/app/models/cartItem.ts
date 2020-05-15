import { Product } from './product';

export class CartItem {
    private _userId: string;
    private _product: Product;
    private _quantity: number;
    constructor(u: string, p: Product, q: number) {
        this._userId = u;
        this._product = p;
        this._quantity = q;
    }

    get userId() { return this._userId; }
    set userId(userId: string) { this._userId = userId; }

    get product() { return this._product; }
    set product(product: Product) { this._product = product; }

    get quantity() { return this._quantity; }
    set quantity(quantity: number) { this.quantity = quantity; }
}