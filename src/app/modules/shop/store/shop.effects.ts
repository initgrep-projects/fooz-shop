import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AppErrorService } from 'src/app/services/app-error.service';
import { ProductRemoteService } from 'src/app/services/remote/product-remote.service';
import { LOAD_CUSTOMSIZE_INPUT_ACTION, LOAD_MORE_PRODUCTS_ACTION, LOAD_PRODUCTS_ACTION } from 'src/app/util/app.constants';
import { addCustomSizeInputAction, addProductsAction, appendProductsAction, loadFailureAtShop } from './shop.actions';

@Injectable()
export class ShopEffects {

    constructor(
        private action$: Actions,
        private dbService: ProductRemoteService,
        private errService: AppErrorService
    ) { }

    loadProducts$ = createEffect(() =>
        this.action$.pipe(
            ofType(LOAD_PRODUCTS_ACTION),
            mergeMap(() => this.dbService.fetchProducts()
                .pipe(
                    map(products => addProductsAction({ payload: products })),
                    catchError(() => of(loadFailureAtShop({ error: this.errService.dataFetchError() }))
                    ))
            )
        ));

    loadMoreProducts$ = createEffect(() =>
        this.action$.pipe(
            ofType(LOAD_MORE_PRODUCTS_ACTION),
            mergeMap(() => this.dbService.fetchMoreProducts()
                .pipe(
                    map(products => appendProductsAction({ payload: products })),
                    catchError(() => of(loadFailureAtShop({ error: this.errService.dataFetchError() }))
                    ))
            )
        ));

    loadCustomSizeInputs$ = createEffect(() =>
        this.action$.pipe(
            ofType(LOAD_CUSTOMSIZE_INPUT_ACTION),
            mergeMap(() => this.dbService.fetchCustomSizeInputs()
                .pipe(
                    map(inputs => addCustomSizeInputAction({ payload: inputs })),
                    catchError(() => of(loadFailureAtShop({ error: this.errService.dataFetchError() }))
                    ))
            )
        ));
}