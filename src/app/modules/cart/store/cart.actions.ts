import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/product';


export const addItemToCartAction = createAction(
    '[cart]  add item',
    props<{payload: Product}>()
);
export const deleteItemInCartAction = createAction(
    '[cart]  delete item',
    props<{productId: string}>()
);
export const updateItemInCartAction = createAction(
    '[cart]  update item',
    props<{payload: Product}>()
);




