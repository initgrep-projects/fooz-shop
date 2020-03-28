import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/product';
import { CustomSizeInput } from 'src/app/models/custom-size';

export const addProductsAction = createAction(
    '[shop] add products',
    props<{ payload: Product[] }>()
);

export const appendProductsAction = createAction(
    '[shop] append products',
    props<{ payload: Product[] }>()
);

export const addCustomSizeInputAction = createAction(
    '[shop] add Custom Size Inputs',
    props<{payload: CustomSizeInput}>()
);

