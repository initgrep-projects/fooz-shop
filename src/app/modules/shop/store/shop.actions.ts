import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/product';

export const addProductsAction = createAction(
    '[shop] add products',
    props<{ payload: Product[] }>()
);

export const appendProductsAction = createAction(
    '[shop] append products',
    props<{ payload: Product[] }>()
);
