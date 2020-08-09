import { Injectable } from '@angular/core';
import { switchMap, take } from 'rxjs/operators';
import { OrderRemoteService } from 'src/app/services/remote/order-remote.service';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private ors: OrderRemoteService,
    private authService: AuthService
  ) { }

  public order$ = this.authService.userFromStore$
    .pipe(
      switchMap(user => this.ors.fetchOrders(user.UID)),
      take(1)
    )
}
