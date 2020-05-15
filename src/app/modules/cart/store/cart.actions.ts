import { createAction, props } from '@ngrx/store';
import { CartItem } from 'src/app/models/cartItem';



export const addItemsToCartAction = createAction(
    '[cart]  add items',
    props<{payload: CartItem[]}>()
);

export const addItemToCartAction = createAction(
    '[cart]  add item',
    props<{payload: CartItem}>()
);
export const deleteItemInCartAction = createAction(
    '[cart]  delete item',
    props<{payload: string}>()
);
export const updateItemInCartAction = createAction(
    '[cart]  update item',
    props<{payload: CartItem}>()
);




