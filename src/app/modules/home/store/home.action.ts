import { createAction, props } from '@ngrx/store';
import { AppError } from 'src/app/models/app-error';
import { LookBookItem } from 'src/app/models/lookbook';
import { Product } from 'src/app/models/product';
import { ADD_LATEST_PRODUCTS_ACTION, ADD_LOOKBOOK_ITEMS_ACTION, LOAD_LATEST_PRODUCTS_ACTION, LOAD_LOOKBOOK_ITEMS_ACTION, LOAD_FAILURE_FOR_HOME, LOAD_TREND_ITEMS, ADD_TREND_ITEMS } from 'src/app/util/app.constants';
import { Image } from 'src/app/models/image';

export const loadLookBookItems = createAction(
    LOAD_LOOKBOOK_ITEMS_ACTION
);
export const loadFailure = createAction(
    LOAD_FAILURE_FOR_HOME,
    props<{ error: AppError }>()
);
export const addLookBookItems = createAction(
    ADD_LOOKBOOK_ITEMS_ACTION,
    props<{ payload: LookBookItem[] }>()
);

export const loadLatestProducts = createAction(
    LOAD_LATEST_PRODUCTS_ACTION
);

export const addlatestProducts = createAction(
    ADD_LATEST_PRODUCTS_ACTION,
    props<{ payload: Product[] }>()
);

export const loadTrendItems = createAction(
    LOAD_TREND_ITEMS
);

export const addTrendItems = createAction(
    ADD_TREND_ITEMS,
    props<{ payload: Image[] }>()
)

