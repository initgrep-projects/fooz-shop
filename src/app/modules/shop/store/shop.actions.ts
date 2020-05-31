import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/product';
import { CustomSizeInput } from 'src/app/models/custom-size';
import { Image } from 'src/app/models/image';

export const addProductsAction = createAction(
    '[product] add products',
    props<{ payload: Product[] }>()
);

export const appendProductsAction = createAction(
    '[product] append products',
    props<{ payload: Product[] }>()
);

export const updateProductAction = createAction(
    '[product] update product',
    props<{ payload: Product }>()
)


export const addCustomSizeInputAction = createAction(
    '[shop] add Custom Size Inputs',
    props<{ payload: CustomSizeInput }>()
);

export const addTrendItemsAction = createAction(
    '[home] add trend items',
    props<{ payload: Image[] }>()
);


