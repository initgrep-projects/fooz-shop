import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { OrderStatus, OrderStage } from 'src/app/models/order-status.model';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit, AfterContentInit {

  @Input() statusList: OrderStatus[];
  confirmed = false;
  shipped = false;
  delivered = false;
  complete = false;
  returned = false;
  failed = false;
  constructor() { }

  ngOnInit(): void {

  }
  ngAfterContentInit() {
    this.evaluateStatus();
  }

  evaluateStatus() {
    this.statusList.forEach(status => {
      if (status.Stage === OrderStage.CONFIRMED) {
        this.confirmed = true;
      } else if (status.Stage === OrderStage.DELIVERED) {
        this.delivered = true;
      } else if (status.Stage === OrderStage.SHIPPED) {
        this.shipped = true;
      } else if (status.Stage === OrderStage.COMPLETE) {
        this.complete = true;
      } else if (status.Stage === OrderStage.RETURNED) {
        this.returned = true;
      } else if (status.Stage === OrderStage.FAILED) {
        this.failed = true;
      }
    });

  }


}
