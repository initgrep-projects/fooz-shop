import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AppErrorService } from 'src/app/services/app-error.service';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';
import { LOAD_LATEST_PRODUCTS_ACTION, LOAD_LOOKBOOK_ITEMS_ACTION, LOAD_TREND_ITEMS } from 'src/app/util/app.constants';
import { addlatestProducts, addLookBookItems, loadFailure, loadTrendItems, addTrendItems } from './home.action';


@Injectable()
export class HomeEffects {
    constructor(
        private action$: Actions,
        private dbService: FireStoreDbService,
        private errService: AppErrorService
    ) { }

    loadLookBookItems$ = createEffect(() =>
        this.action$.pipe(
            ofType(LOAD_LOOKBOOK_ITEMS_ACTION),
            mergeMap(() => this.dbService.fetchLookBookItems()
                .pipe(
                    map(lbItems => addLookBookItems({ payload: lbItems })),
                    catchError(() => of(loadFailure({ error: this.errService.dataFetchError() })))
                )
            )
        ));

    loadLatestProducts$ = createEffect(() =>
        this.action$.pipe(
            ofType(LOAD_LATEST_PRODUCTS_ACTION),
            mergeMap(() => this.dbService.fetchLatestProducts()
                .pipe(
                    map(products => addlatestProducts({ payload: products })),
                    catchError(() => of(loadFailure({ error: this.errService.dataFetchError() })))
                )
            )
        ));

        loadTrendItems$ = createEffect(() =>
        this.action$.pipe(
            ofType(LOAD_TREND_ITEMS),
            mergeMap(() => this.dbService.fetchTrendItems()
                .pipe(
                    map(items => addTrendItems({ payload: items })),
                    catchError(() => of(loadFailure({ error: this.errService.dataFetchError() })))
                )
            )
        ));

}