import { OrderStatus } from './order-status.model';
import { Payment } from './payment.model';
import { Currency } from './currency';
import { Coupon } from './coupon.model';
import { CartItem } from './cart-item';
import { Address } from './address';

export interface OrderSplitCharges {
    itemPrice: Currency,
    tax: Currency,
    shipping: Currency,
    coupon?: Coupon
}

/**
 * type to create a complete order
 */
export class Order {
    constructor(
        private orderItem?: OrderItem,
        private payment?: Payment,
        private statusList?: OrderStatus[],
        private cart?: CartItem[],
        private address?: Address
    ) { }

    get OrderItem() { return this.orderItem; }
    set OrderItem(ot: OrderItem) { this.orderItem = ot; }
    get Payment() { return this.payment; }
    set Payment(p: Payment) { this.payment = p; }
    get StatusList() { return this.statusList; }
    set StatusList(s: OrderStatus[]) { this.statusList = s; }

    //@Todo tobe added later 
    // get Status(id:string)
    // set Status() //add a status

    /** Cart is added in the order at the time of fetching */
    get Cart() { return this.cart; }
    set Cart(c: CartItem[]) { this.cart = c; }

    /*** Address is also added at the time of fetching the data */
    get Address() { return this.address; }
    set Address(a: Address) { this.address = a; }

}
/**
 * type to store order item in db
 */
export class OrderItem {
    constructor(
        private id: string,
        private userId: string,
        private cartItemIds: string[],
        private addressId: string,
        private createdOn: number = Date.now()
    ) { }

    get Id() { return this.id; }
    // set Id(id:string){ this.id = id;}
    get UserId() { return this.userId; }
    set UserId(uid: string) { this.userId = uid; }

    get CartItemIds() { return this.cartItemIds; }
    set CartItemIds(cids: string[]) { this.cartItemIds = cids; }
    set CartItemId(cartItemId: string) { this.cartItemIds.push(cartItemId); }

    get AddressId() { return this.addressId; }
    set AddressId(addId: string) { this.addressId = addId; }

    get CreatedDate() { return this.createdOn; }

}