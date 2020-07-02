import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/models/category';
import { Size } from 'src/app/models/size';
import { Sort } from 'src/app/models/Sort';
import { AppError } from 'src/app/models/app-error';
import { LOAD_ALL_CATEGORY_ACTION, ADD_ALL_CATEGORIES_ACTION, SELECTED_CATEGORIES_ACTION, LOAD_ALL_SIZES_ACTION, ADD_ALL_SIZES_ACTION, SELECTED_SIZES_ACTION, LOAD_ALL_SORT_ORDERS_ACTION, ADD_ALL_SORT_ORDERS_ACTION, SELECT_SORT_ORDER_ACTION, LOAD_FAILURE_FOR_FILTER_ACTION } from 'src/app/util/app.constants';

export const loadAllCategoriesAction = createAction(
    LOAD_ALL_CATEGORY_ACTION
);
export const addAllCategoriesAction = createAction(
    ADD_ALL_CATEGORIES_ACTION,
    props<{ payload: Category[] }>()
);
export const selectedCategoriesAction = createAction(
    SELECTED_CATEGORIES_ACTION,
    props<{ payload: Category[] }>()
);

export const loadAllSizesAction = createAction(
    LOAD_ALL_SIZES_ACTION
);
export const addAllSizesAction = createAction(
    ADD_ALL_SIZES_ACTION,
    props<{ payload: Size[] }>()
);
export const selectedSizesAction = createAction(
    SELECTED_SIZES_ACTION,
    props<{ payload: Size[] }>()
);

export const loadAllSortOrdersAction = createAction(
    LOAD_ALL_SORT_ORDERS_ACTION
);
export const addAllSortOrdersAction = createAction(
    ADD_ALL_SORT_ORDERS_ACTION,
    props<{ payload: Sort[] }>()
);

export const selectSortOrderAction = createAction(
    SELECT_SORT_ORDER_ACTION,
    props<{ payload: Sort }>()
);

export const loadFailureAtFilter = createAction(
    LOAD_FAILURE_FOR_FILTER_ACTION,
    props<{ error: AppError }>()
)