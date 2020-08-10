import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from '../../main/store/app.reducer';
import { loadOrdersAction } from '../store/account.actions';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders$ = this.store.select('account').pipe(map(state => state.orders));

  constructor(
    private store: Store<AppState>
  ) {
    this.loadOrders();
  }

  loadOrders() {
    this.store.dispatch(loadOrdersAction());
  }




}
