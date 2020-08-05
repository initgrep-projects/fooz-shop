
export enum OrderStage {
    CONFIRMED = 'CONFIRMED',
    FAILED = 'FAILED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED'
}


export class OrderStatus {
    constructor(
        private id: string,
        private stage: OrderStage,
        private createdOn: number = Date.now(),
        private shippingId?: string,
    ) { }

    get Id() { return this.id; }
    // set Id(id: string) { this.id = id; }
    get Stage() { return this.stage; }
    set Stage(stage: OrderStage) { this.stage = stage; }
    get ShippingId() { return this.shippingId; }
    set ShippingId(shipId: string) { this.shippingId = shipId; }
    get CreatedOn() { return this.createdOn; }
    set CreatedOn(co: number) { this.createdOn = co; }
}