import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductRemoteService } from 'src/app/services/remote/product-remote.service';
import { AppErrorService } from 'src/app/services/app-error.service';
import { LOAD_BRAND_ACTION } from 'src/app/util/app.constants';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { saveBrand, loadFailureAtHeader } from './header.actions';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class HeaderEffects {
    constructor(
        private action$: Actions,
        private dbService: ProductRemoteService,
        private errService: AppErrorService
    ) { }

    loadBrand$ = createEffect(() =>
        this.action$.pipe(
            ofType(LOAD_BRAND_ACTION),
            mergeMap(() => this.dbService.fetchBrand()
                .pipe(
                    map(brand => saveBrand({ payload: brand })),
                    catchError(() => of(loadFailureAtHeader({ error: this.errService.dataFetchError() })))
                )
            )
        )
    );
}