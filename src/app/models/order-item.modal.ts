import { OrderStatus } from './order-status';
import { generateGuid } from '../util/app.lib';

export class OrderItem {
    constructor(
        private id: string,
        private userId: string,
        private cartItemIds: string[],
        private addressId: string,
        private statusIds: string[],
        private paymentId: string
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

    get StatusIds() { return this.statusIds; }
    set StatusId(id: string) { this.statusIds.push(id); }
    set StatusIds(ids: string[]) { this.statusIds = ids; }

    get PaymentId() { return this.paymentId; }
    set PaymentId(pid: string) { this.paymentId = pid; }
}