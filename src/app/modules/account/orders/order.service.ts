import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from '../../main/store/app.reducer';
import { loadOrdersAction, loadSelectedOrderAction, addSelectedOrderAction } from '../store/account.actions';
import { Order } from 'src/app/models/order.modal';

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
    this.store.dispatch(loadOrdersAction());
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
      )
  }




}
