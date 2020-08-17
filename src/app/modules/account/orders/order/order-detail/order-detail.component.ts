import { Component, OnDestroy, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { fadeIn } from 'src/app/animations/fadeAnimation';
import { OrderStage, OrderStatus } from 'src/app/models/order-status.model';
import { Order } from 'src/app/models/order.modal';
import { orderLables } from 'src/app/util/app.labels';
import { SubSink } from 'subsink';
import { OrderService, OrderStatusInput } from '../../order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  animations: [fadeIn]
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  labels = orderLables;
  selectedOrder: Order;
  cancellProgress = false;


  statusInput: OrderStatusInput = {
    confirmed: { done: false },
    shipped: { done: false },
    delivered: { done: false },
    complete: { done: false },
    returned: { done: false },
    cancelled: { done: false },
  };;

  constructor(public ods: OrderService) { }

  ngOnInit(): void {
    this.subs.sink =
      this.ods.selectedOrder$.subscribe(ord => {
        if (!!ord) {
          this.selectedOrder = cloneDeep(ord);
          this.evaluateStatus([...ord.StatusList]);
        }
      });
  }


  evaluateStatus(statusList: OrderStatus[]) {
    statusList.forEach(status => {
      switch (status.Stage) {
        case OrderStage.CONFIRMED:
          this.statusInput.confirmed.date = this.ods.formatDate(status.CreatedOn);
          this.statusInput.confirmed.done = true;
          break;
        case OrderStage.SHIPPED:
          this.statusInput.shipped.date = this.ods.formatDate(status.CreatedOn);
          this.statusInput.shipped.done = true;
          break;
        case OrderStage.DELIVERED:
          this.statusInput.delivered.date = this.ods.formatDate(status.CreatedOn);
          this.statusInput.delivered.done = true;
          break;
        case OrderStage.COMPLETE:
          this.statusInput.complete.date = this.ods.formatDate(status.CreatedOn);
          this.statusInput.complete.done = true;
          break;
        case OrderStage.RETURNED:
          this.statusInput.returned.date = this.ods.formatDate(status.CreatedOn);
          this.statusInput.returned.done = true;
          break;
        case OrderStage.CANCELLED:
          this.statusInput.cancelled.date = this.ods.formatDate(status.CreatedOn);
          this.statusInput.cancelled.done = true;
          break;
      }


    });
    console.log("inputstatus => ", this.statusInput);
  }

  cancelOrder() {
    this.cancellProgress = true;
    this.subs.sink =
      this.ods.cancelOrder(this.selectedOrder.OrderItem.Id)
        .subscribe(
          ok => this.cancellProgress = false,
          (err) => { },
          () => this.cancellProgress = false
        );
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
