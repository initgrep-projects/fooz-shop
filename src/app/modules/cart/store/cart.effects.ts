import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';
import { AppErrorService } from 'src/app/services/app-error.service';
import { LOAD_CART_ACTION } from 'src/app/util/app.constants';
import { mergeMap, switchMap, tap, map, catchError } from 'rxjs/operators';
import { isEmpty } from 'lodash';
import { of, zip } from 'rxjs';
import { CartItem } from 'src/app/models/cartItem';
import { AuthService } from '../../auth/auth.service';
import { addItemsToCartAction, loadFailureCartAction } from './cart.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../main/store/app.reducer';

@Injectable()
export class CartEffects {

    constructor(
        private action$: Actions,
        private db: FireStoreDbService,
        private err: AppErrorService,
        private auth: AuthService,
        private store: Store<AppState>
    ) { }


    loadCart$ = createEffect(() =>
        this.action$.pipe(
            ofType(LOAD_CART_ACTION),
            mergeMap(() =>
                // get the current loggedInUserFromStore
                this.auth.userFromStore$
                    .pipe(
                        switchMap(user => {
                            //fetch the cart for current loggedInUser
                            if (!!user) {
                                return this.db.fetchCart(user.UID)
                            }
                            return of(null);
                        }),
                        map(items => addItemsToCartAction({ payload: items })),
                        catchError(() => of(loadFailureCartAction({ error: this.err.dataFetchError() })))

                    )
            )
        )
    )
}