import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from '../../main/store/app.reducer';
import { loadOrdersAction, loadSelectedOrderAction } from '../store/account.actions';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders$ = this.store.select('account').pipe(map(state => state.orders));

  constructor(
    private store: Store<AppState>
  ) {
    this.loadOrders();
    this.loadSelectedOrder();
  }

  loadOrders() {
    this.store.dispatch(loadOrdersAction());
  }

  loadSelectedOrder() {
    this.store.dispatch(loadSelectedOrderAction({ orderId: 'DC84A567-5FAE-0167-FEA8-23B19E6305D7' }));
  }




}
