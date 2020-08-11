import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/models/order.modal';
import { OrderStatus } from 'src/app/models/order-status.model';
import { orderLables } from 'src/app/util/app.labels';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  labels = orderLables;
  @Input() order: Order;
  private finalStatus: OrderStatus;

  constructor() { }

  ngOnInit(): void {
  }

  get FinalStatus() {
    const length = this.order.StatusList.length;
    return this.order.StatusList[length - 1];
  }

  formatDate(timeStamp: number) {
    return new Date(timeStamp);
  }

}
