import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { AppErrorService } from 'src/app/services/app-error.service';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';
import { LOAD_CART_ACTION } from 'src/app/util/app.constants';
import { AuthService } from '../../auth/auth.service';
import { AppState } from '../../main/store/app.reducer';
import { addItemsToCartAction, loadFailureCartAction } from './cart.actions';

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
                        switchMap(user => !!user ? this.db.fetchCart(user.UID) : of(null)),
                        map(items => addItemsToCartAction({ payload: items })),
                        catchError(() => of(loadFailureCartAction({ error: this.err.dataFetchError() })))
                    )
            )
        )
    )
}