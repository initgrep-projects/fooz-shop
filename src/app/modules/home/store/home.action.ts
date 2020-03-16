import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/product';

export const addProductsToHomeAction = createAction(
    '[home] add products',
    props<{payload: Product[]}>()
    );