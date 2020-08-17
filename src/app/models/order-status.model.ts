import { generateGuid } from '../util/app.lib';

export enum OrderStage {
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    RETURNED = 'RETURNED',
    COMPLETE = 'COMPLETE'
}


export class OrderStatus {
    constructor(
        private id: string,
        private orderId: string,
        private stage: OrderStage,
        private createdOn: number = Date.now(),
        private shippingId: string = null,
    ) { }

    get Id() { return this.id; }
    // set Id(id: string) { this.id = id; }
    get OrderId() { return this.orderId; }
    set OrderId(oid: string) { this.orderId = oid; }
    get Stage() { return this.stage; }
    set Stage(stage: OrderStage) { this.stage = stage; }
    get ShippingId() { return this.shippingId; }
    set ShippingId(shipId: string) { this.shippingId = shipId; }
    get CreatedOn() { return this.createdOn; }
    set CreatedOn(co: number) { this.createdOn = co; }


    static confirm(orderId: string, shippingId?: string) {
        return new OrderStatus(generateGuid(), orderId, OrderStage.CONFIRMED, Date.now(), shippingId);
    }

    static cancel(orderId: string, shippingId?: string) {
        return new OrderStatus(generateGuid(), orderId, OrderStage.CANCELLED, Date.now(), shippingId);
    }

    static ship(orderId: string, shippingId?: string) {
        return new OrderStatus(generateGuid(), orderId, OrderStage.SHIPPED, Date.now(), shippingId);
    }

    static deliver(orderId: string, shippingId?: string) {
        return new OrderStatus(generateGuid(), orderId, OrderStage.DELIVERED, Date.now(), shippingId);
    }

    static complete(orderId: string, shippingId?: string) {
        return new OrderStatus(generateGuid(), orderId, OrderStage.COMPLETE, Date.now(), shippingId);
    }
    static return(orderId: string, shippingId?: string) {
        return new OrderStatus(generateGuid(), orderId, OrderStage.RETURNED, Date.now(), shippingId);
    }

}
