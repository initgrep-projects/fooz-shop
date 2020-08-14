import { Component, OnInit, Input, AfterContentInit, ViewEncapsulation } from '@angular/core';
import { OrderStatus, OrderStage } from 'src/app/models/order-status.model';
import { orderLables } from 'src/app/util/app.labels';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit, AfterContentInit {
  labels = orderLables;
  @Input() statusList: OrderStatus[];
  confirmed = false;
  confirmedDate: Date;
  shipped = false;
  shippedDate: Date;
  delivered = false;
  deliveredDate: Date;
  complete = false;
  completedDate: Date;
  returned = false;
  returnedDate: Date;
  cancelled = false;
  cancelledDate: Date;

  constructor() { }

  ngOnInit(): void {

  }
  ngAfterContentInit() {
    this.evaluateStatus();
  }

  evaluateStatus() {
    this.statusList.forEach(status => {
      if (status.Stage === OrderStage.CONFIRMED) {
        this.confirmedDate = this.formatDate(status.CreatedOn)
        this.confirmed = true;
      } else if (status.Stage === OrderStage.DELIVERED) {
        this.deliveredDate = this.formatDate(status.CreatedOn)
        this.delivered = true;
      } else if (status.Stage === OrderStage.SHIPPED) {
        this.shippedDate = this.formatDate(status.CreatedOn);
        this.shipped = true;
      } else if (status.Stage === OrderStage.COMPLETE) {
        this.completedDate = this.formatDate(status.CreatedOn);
        this.complete = true;
      } else if (status.Stage === OrderStage.RETURNED) {
        this.returnedDate = this.formatDate(status.CreatedOn);
        this.returned = true;
      } else if (status.Stage === OrderStage.CANCELLED) {
        this.cancelledDate = this.formatDate(status.CreatedOn);
        this.cancelled = true;
      }
    });

  }

  formatDate(timeStamp: number) {
    return new Date(timeStamp);
  }


}
