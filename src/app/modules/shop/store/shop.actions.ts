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

export const addItemToCartAction = createAction(
    '[cart]  add item',
    props<{payload: Product}>()
);
export const deleteItemInCartAction = createAction(
    '[cart]  delete item',
    props<{payload: string}>()
);
export const updateItemInCartAction = createAction(
    '[cart]  update item',
    props<{payload: Product}>()
);




export const addCustomSizeInputAction = createAction(
    '[shop] add Custom Size Inputs',
    props<{payload: CustomSizeInput}>()
);



