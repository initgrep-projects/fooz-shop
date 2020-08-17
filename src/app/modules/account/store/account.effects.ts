import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, zip, Observable } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AppMessageService } from 'src/app/services/app-error.service';
import { GeoAddressService } from 'src/app/services/geo-address.service';
import { AddressRemoteService } from 'src/app/services/remote/address-remote.service';
import { OrderRemoteService } from 'src/app/services/remote/order-remote.service';
import { AuthService } from '../../auth/auth.service';
import { addAddressesAction, addCountriesAction, addOrdersAction, addSelectedAddressAction, addSelectedOrderAction, loadAddressesAction, loadCountriesAction, loadFailureInAccountAction, loadOrdersAction, loadSelectedAddressAction, loadSelectedOrderAction, appendOrdersAction } from './account.actions';
import { Order } from 'src/app/models/order.modal';


@Injectable()
export class AccountEffects {
    constructor(
        private action$: Actions,
        private dbAddress: AddressRemoteService,
        private dbOrders: OrderRemoteService,
        private geo: GeoAddressService,
        private auth: AuthService,
        private err: AppMessageService
    ) { }


    loadAddresses$ = createEffect(() =>
        this.action$.pipe(
            ofType(loadAddressesAction),
            mergeMap(() =>
                this.auth.userFromStore$
                    .pipe(
                        switchMap(user => !!user ? this.dbAddress.fetchAddresses(user.UID) : of(null)),
                        map(ad => addAddressesAction({ payload: ad })),
                        catchError(() => of(loadFailureInAccountAction({ error: this.err.dataFetchError() })))
                    ))
        ));

    loadSelectedAddress$ = createEffect(() =>
        this.action$.pipe(
            ofType(loadSelectedAddressAction),
            mergeMap((action) =>
                this.auth.userFromStore$
                    .pipe(
                        switchMap(user => !!user ? this.dbAddress.fetchAddressForUserById(action.addressId, user.UID) : of(null)),
                        map(ad => addSelectedAddressAction({ payload: ad })),
                        catchError(() => of(loadFailureInAccountAction({ error: this.err.dataFetchError() })))
                    ))
        ));

    loadOrders$ = createEffect(() =>
        this.action$.pipe(
            ofType(loadOrdersAction),
            mergeMap((action) =>
                this.auth.userFromStore$
                    .pipe(
                        tap(user => console.log('loadOrders effect called ', user.UID, action.paginate)),
                        switchMap(user => {
                            const order$: Observable<Order[]> = !!user ? this.dbOrders.fetchOrders(user.UID, action.paginate) : of(null);
                            return zip(order$, of(action));
                        }),
                        map(([orders, action]) => {
                            console.log('orders fetch in effects ', orders);
                            return !action.paginate ? addOrdersAction({ payload: orders }) : appendOrdersAction({ payload: orders });
                        }),
                        catchError((err) => {
                            console.error('error happened in laodOrders => ', err);
                            return of(loadFailureInAccountAction({ error: err }));
                        })
                    ))
        ));


    loadSelectedOrders = createEffect(() =>
        this.action$.pipe(
            ofType(loadSelectedOrderAction),
            tap(action => console.log('loadSelectedOrderAction ', action.orderId)),
            mergeMap((action) =>
                this.auth.userFromStore$
                    .pipe(

                        switchMap(user => !!user ? this.dbOrders.fetchOrderByOrderId(user.UID, action.orderId) : of(null)),
                        map(ad => addSelectedOrderAction({ payload: ad })),
                        catchError(() => of(loadFailureInAccountAction({ error: this.err.dataFetchError() })))
                    ))
        ));

    loadCountries$ = createEffect(() =>
        this.action$.pipe(
            ofType(loadCountriesAction),
            mergeMap(() => this.geo.getCountries()
                .pipe(
                    map(countries => addCountriesAction({ payload: countries })),
                    catchError(() => of(loadFailureInAccountAction({ error: this.err.dataFetchError() })))
                ))
        ));

}