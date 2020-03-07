import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product';

export const fetchProductsAction = createAction(
    '[shop] fetch all products',
    props<{payload: Product[]}>()
    );
