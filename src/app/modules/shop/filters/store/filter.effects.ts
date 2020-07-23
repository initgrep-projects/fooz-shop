import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AppMessageService } from 'src/app/services/app-error.service';
import { ProductRemoteService } from 'src/app/services/remote/product-remote.service';
import { LOAD_ALL_CATEGORY_ACTION, LOAD_ALL_SIZES_ACTION, LOAD_ALL_SORT_ORDERS_ACTION } from 'src/app/util/app.constants';
import { addAllCategoriesAction, addAllSizesAction, addAllSortOrdersAction, loadFailureAtFilter } from './filter.action';

@Injectable()
export class FilterEffects {
    constructor(
        private action$: Actions,
        private db: ProductRemoteService,
        private errService: AppMessageService
    ) { }


    loadAllCategories$ = createEffect(() =>
        this.action$.pipe(
            ofType(LOAD_ALL_CATEGORY_ACTION),
            mergeMap(() => this.db.fetchCategories()
                .pipe(
                    map(categories => addAllCategoriesAction({ payload: categories })),
                    catchError(() => of(loadFailureAtFilter({ error: this.errService.dataFetchError() })))
                )
            )
        )
    );

    loadAllSizes$ = createEffect(() =>
        this.action$.pipe(
            ofType(LOAD_ALL_SIZES_ACTION),
            mergeMap(() => this.db.fetchSizes()
                .pipe(
                    map(sizes => addAllSizesAction({ payload: sizes })),
                    catchError(() => of(loadFailureAtFilter({ error: this.errService.dataFetchError() })))
                )
            )
        )
    );

    loadAllSortOrders$ = createEffect(() =>
        this.action$.pipe(
            ofType(LOAD_ALL_SORT_ORDERS_ACTION),
            mergeMap(() => this.db.fetchSortOrders()
                .pipe(
                    map(sorts => addAllSortOrdersAction({ payload: sorts })),
                    catchError(() => of(loadFailureAtFilter({ error: this.errService.dataFetchError() })))
                )
            )
        )
    );


}