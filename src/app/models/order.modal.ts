import { OrderStatus } from './order-status.model';
import { Payment } from './payment.model';

/**
 * type to create a complete order
 */
export class Order {
    constructor(
        private orderItem: OrderItem,
        private payment: Payment,
        private status: OrderStatus
    ) { }

    get OrderItem() { return this.orderItem; }
    get Payment() { return this.payment; }
    get Status() { return this.status; }

}
/**
 * type to store order item in db
 */
export class OrderItem {
    constructor(
        private id: string,
        private userId: string,
        private cartItemIds: string[],
        private addressId: string
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

}