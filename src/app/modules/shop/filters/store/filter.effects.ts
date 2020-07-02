import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';
import { LOAD_ALL_CATEGORY_ACTION, LOAD_ALL_SIZES_ACTION, LOAD_ALL_SORT_ORDERS_ACTION } from 'src/app/util/app.constants';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { addAllCategoriesAction, loadFailureAtFilter, addAllSizesAction, addAllSortOrdersAction } from './filter.action';
import { AppErrorService } from 'src/app/services/app-error.service';
import { of } from 'rxjs';

@Injectable()
export class FilterEffects {
    constructor(
        private action$: Actions,
        private db: FireStoreDbService,
        private errService: AppErrorService
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