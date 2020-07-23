import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AppMessageService } from 'src/app/services/app-error.service';
import { CartRemoteService } from 'src/app/services/remote/cart-remote.service';
import { LOAD_CART_ACTION } from 'src/app/util/app.constants';
import { AuthService } from '../../auth/auth.service';
import { addItemsToCartAction, loadFailureCartAction } from './cart.actions';

@Injectable()
export class CartEffects {

    constructor(
        private action$: Actions,
        private db: CartRemoteService,
        private err: AppMessageService,
        private auth: AuthService
    ) { }


    loadCart$ = createEffect(() =>
        this.action$.pipe(
            ofType(LOAD_CART_ACTION),
            mergeMap(() =>
                // get the current loggedInUserFromStore

                this.auth.userFromStore$
                    .pipe(
                        switchMap(user => !!user ? this.db.fetchCart(user.UID) : of(null)),
                        map(items => addItemsToCartAction({ payload: items })),
                        catchError(() => of(loadFailureCartAction({ error: this.err.dataFetchError() })))
                    )
            )
        )
    )
}