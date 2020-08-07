import { generateGuid } from '../util/app.lib';

export enum OrderStage {
    CONFIRMED = 'CONFIRMED',
    FAILED = 'FAILED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED'
}


export class OrderStatus {
    constructor(
        private id: string,
        private orderId: string,
        private stage: OrderStage,
        private createdOn: number = Date.now(),
        private shippingId?: string,
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


    static confirmed(orderId: string, shippingId?: string) {
        return new OrderStatus(generateGuid(), orderId, OrderStage.CONFIRMED, Date.now(), shippingId);
    }

    static failed(orderId: string, shippingId?: string) {
        return new OrderStatus(generateGuid(), orderId, OrderStage.FAILED, Date.now(), shippingId);
    }

    static shipped(orderId: string, shippingId?: string) {
        return new OrderStatus(generateGuid(), orderId, OrderStage.SHIPPED, Date.now(), shippingId);
    }

    static delivered(orderId: string, shippingId?: string) {
        return new OrderStatus(generateGuid(), orderId, OrderStage.DELIVERED, Date.now(), shippingId);
    }

}
