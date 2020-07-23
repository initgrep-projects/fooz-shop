import { createAction, props } from '@ngrx/store';
import { Brand } from 'src/app/models/brand';
import { LOAD_BRAND_ACTION, SAVE_BRAND_ACTION, LOAD_BRAND_FAILURE_ACTION } from 'src/app/util/app.constants';
import { AppMsg } from 'src/app/models/app-msg';

export const loadBrand = createAction(
    LOAD_BRAND_ACTION
);

export const saveBrand = createAction(
    SAVE_BRAND_ACTION,
    props<{ payload: Brand }>()
);

export const loadFailureAtHeader = createAction(
    LOAD_BRAND_FAILURE_ACTION,
    props<{ error: AppMsg }>()
);