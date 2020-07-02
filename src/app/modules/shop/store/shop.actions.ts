import { createAction, props } from '@ngrx/store';
import { AppError } from 'src/app/models/app-error';
import { CustomSizeInput } from 'src/app/models/custom-size';
import { Product } from 'src/app/models/product';
import { ADD_CUSTOMZIE_INPUT_ACTION, ADD_PRODUCTS_ACTION, APPEND_PRODUCTS_ACTION, LOAD_CUSTOMSIZE_INPUT_ACTION, LOAD_FAILURE_FOR_SHOP_ACTION, LOAD_MORE_PRODUCTS_ACTION, LOAD_PRODUCTS_ACTION, UPDATE_PRODUCTS_ACTION } from 'src/app/util/app.constants';

export const loadProducts = createAction(
    LOAD_PRODUCTS_ACTION
);
export const addProductsAction = createAction(
    ADD_PRODUCTS_ACTION,
    props<{ payload: Product[] }>()
);

export const loadMoreProducts = createAction(
    LOAD_MORE_PRODUCTS_ACTION
);

export const appendProductsAction = createAction(
    APPEND_PRODUCTS_ACTION,
    props<{ payload: Product[] }>()
);

export const updateProductAction = createAction(
    UPDATE_PRODUCTS_ACTION,
    props<{ payload: Product }>()
);

export const loadCustomSizeInputs = createAction(
    LOAD_CUSTOMSIZE_INPUT_ACTION
);

export const addCustomSizeInputAction = createAction(
    ADD_CUSTOMZIE_INPUT_ACTION,
    props<{ payload: CustomSizeInput }>()
);
export const loadFailureAtShop = createAction(
    LOAD_FAILURE_FOR_SHOP_ACTION,
    props<{ error: AppError }>()
);


