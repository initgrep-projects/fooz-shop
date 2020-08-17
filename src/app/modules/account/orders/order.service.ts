import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, tap, catchError, take } from 'rxjs/operators';
import { Order } from 'src/app/models/order.modal';
import { AppState } from '../../main/store/app.reducer';
import { addSelectedOrderAction, loadOrdersAction, loadSelectedOrderAction } from '../store/account.actions';
import { OrderRemoteService } from 'src/app/services/remote/order-remote.service';
import { OrderStatus } from 'src/app/models/order-status.model';
import { ToastService } from '../../shared/toasts/toast.service';
import { of } from 'rxjs';
import { RouteManagementService } from '../../main/route-management.service';

export interface OrderStatusInput {
  confirmed: { done: boolean, date?: Date };
  shipped: { done: boolean, date?: Date };
  delivered: { done: boolean, date?: Date };
  complete: { done: boolean, date?: Date };
  returned: { done: boolean, date?: Date };
  cancelled: { done: boolean, date?: Date };
}
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders$ = this.store.select('account').pipe(map(state => state.orders));
  selectedOrder$ = this.store.select('account').pipe(map(state => state.selectedOrder));

  constructor(
    private store: Store<AppState>,
    private ors: OrderRemoteService,
    private toaster: ToastService,
    private rmgt: RouteManagementService
  ) {
    console.log('orderService init');
    this.loadOrders();
  }

  loadOrders() {
    this.store.dispatch(loadOrdersAction({ paginate: false }));
  }

  loadPaginatedOrders() {
    console.log('showmore orders');
    this.store.dispatch(loadOrdersAction({ paginate: true }));
  }

  loadSelectedOrderFromRemote(orderId: string) {
    this.store.dispatch(loadSelectedOrderAction({ orderId: orderId }));
  }

  addSelectedOrder(order: Order) {
    this.store.dispatch(addSelectedOrderAction({ payload: order }));
  }


  saveOrder(order: Order) {
    return this.ors.saveOrder(order);
  }

  cancelOrder(orderId: string) {
    return this.ors.saveOrderStatus(OrderStatus.cancel(orderId))
      .pipe(
        take(1),
        tap(ok => {
          if (ok) {
            this.loadOrders();
            this.toaster.success('Order cancelled');
            this.rmgt.routeToOrders();
          }
        }),
        catchError(err => {
          this.toaster.failure('Order cancel failed');
          return of(err);
        })
      );
  }

  addSelectedOrderFromLocalStore(orderId: String) {
    return this.orders$
      .pipe(
        map(orders => orders?.find(order => order.OrderItem.Id === orderId)),
        map(order => {
          if (!!order) {
            this.addSelectedOrder(order);
            return true;
          }
          return false;
        })
      );
  }

  formatDate(timeStamp: number) {
    return new Date(timeStamp);
  }






}
