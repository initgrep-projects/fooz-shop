import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AppMessageService } from 'src/app/services/app-error.service';
import { ProductRemoteService } from 'src/app/services/remote/product-remote.service';
import { LOAD_LATEST_PRODUCTS_ACTION, LOAD_LOOKBOOK_ITEMS_ACTION, LOAD_TREND_ITEMS_ACTION } from 'src/app/util/app.constants';
import { addlatestProducts, addLookBookItems, addTrendItems, loadFailureAtHome } from './home.action';


@Injectable()
export class HomeEffects {
    constructor(
        private action$: Actions,
        private dbService: ProductRemoteService,
        private errService: AppMessageService
    ) { }

    loadLookBookItems$ = createEffect(() =>
        this.action$.pipe(
            ofType(LOAD_LOOKBOOK_ITEMS_ACTION),
            mergeMap(() => this.dbService.fetchLookBookItems()
                .pipe(
                    map(lbItems => addLookBookItems({ payload: lbItems })),
                    catchError(() => of(loadFailureAtHome({ error: this.errService.dataFetchError() })))
                )
            )
        ));

    loadLatestProducts$ = createEffect(() =>
        this.action$.pipe(
            ofType(LOAD_LATEST_PRODUCTS_ACTION),
            mergeMap(() => this.dbService.fetchLatestProducts()
                .pipe(
                    map(products => addlatestProducts({ payload: products })),
                    catchError(() => of(loadFailureAtHome({ error: this.errService.dataFetchError() })))
                )
            )
        ));

        loadTrendItems$ = createEffect(() =>
        this.action$.pipe(
            ofType(LOAD_TREND_ITEMS_ACTION),
            mergeMap(() => this.dbService.fetchTrendItems()
                .pipe(
                    map(items => addTrendItems({ payload: items })),
                    catchError(() => of(loadFailureAtHome({ error: this.errService.dataFetchError() })))
                )
            )
        ));

}