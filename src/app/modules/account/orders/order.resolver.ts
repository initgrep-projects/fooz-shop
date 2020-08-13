import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from './order.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderResolver implements Resolve<boolean>{

  constructor(
    private orderService: OrderService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : boolean | Observable<boolean> | Promise<boolean> {

    const id = route.paramMap.get('id');
    return this.orderService.selectedOrder$
      .pipe(
        tap(order => {
          if (!order) {
            this.orderService.loadSelectedOrder(id);
          }
        }),
        take(1),
        map(order => !!order)
      );
  }
}
