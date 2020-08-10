import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { AppMessageService } from 'src/app/services/app-error.service';
import { GeoAddressService } from 'src/app/services/geo-address.service';
import { AddressRemoteService } from 'src/app/services/remote/address-remote.service';
import { LOAD_ADDRESSES_ACTION, LOAD_COUNTRIES_ACTION, LOAD_ORDERS_ACTION } from 'src/app/util/app.constants';
import { AuthService } from '../../auth/auth.service';
import { addAddressesAction, addCountriesAction, loadFailureInAccountAction, addOrdersAction } from './account.actions';
import { OrderRemoteService } from 'src/app/services/remote/order-remote.service';


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
            ofType(LOAD_ADDRESSES_ACTION),
            mergeMap(() =>
                this.auth.userFromStore$
                    .pipe(
                        switchMap(user => !!user ? this.dbAddress.fetchAddresses(user.UID) : of(null)),
                        map(ad => addAddressesAction({ payload: ad })),
                        catchError(() => of(loadFailureInAccountAction({ error: this.err.dataFetchError() })))
                    ))
        ));

    loadOrders$ = createEffect(() =>
        this.action$.pipe(
            ofType(LOAD_ORDERS_ACTION),
            mergeMap(() =>
                this.auth.userFromStore$
                    .pipe(
                        switchMap(user => !!user ? this.dbOrders.fetchOrders(user.UID) : of(null)),
                        map(ad => addOrdersAction({ payload: ad })),
                        catchError(() => of(loadFailureInAccountAction({ error: this.err.dataFetchError() })))
                    ))
        ));

    loadCountries$ = createEffect(() =>
        this.action$.pipe(
            ofType(LOAD_COUNTRIES_ACTION),
            mergeMap(() => this.geo.getCountries()
                .pipe(
                    map(countries => addCountriesAction({ payload: countries })),
                    catchError(() => of(loadFailureInAccountAction({ error: this.err.dataFetchError() })))
                ))
        ));

}