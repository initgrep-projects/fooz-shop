import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/models/order.modal';
import { AppState } from '../../main/store/app.reducer';
import { addSelectedOrderAction, loadOrdersAction, loadSelectedOrderAction } from '../store/account.actions';

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
    private store: Store<AppState>
  ) {
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

  isSelectedOrderInLocalStore(orderId: String) {
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
