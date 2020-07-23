import { createAction, props } from '@ngrx/store';
import { AppMsg } from 'src/app/models/app-msg';
import { CartItem } from 'src/app/models/cartItem';
import {
    ADD_ITEMS_TO_CART_ACTION, ADD_ITEM_TO_CART_ACTION, DELETE_ITEM_IN_CART_ACTION,
    LOAD_CART_ACTION, LOAD_FAILURE_IN_CART_ACTION, UPDATE_ITEM_IN_CART_ACTION
} from 'src/app/util/app.constants';


export const loadItemsToCartAction = createAction(
    LOAD_CART_ACTION
);

export const addItemsToCartAction = createAction(
    ADD_ITEMS_TO_CART_ACTION,
    props<{ payload: CartItem[] }>()
);

export const addItemToCartAction = createAction(
    ADD_ITEM_TO_CART_ACTION,
    props<{ payload: CartItem }>()
);
export const deleteItemInCartAction = createAction(
    DELETE_ITEM_IN_CART_ACTION,
    props<{ payload: string }>()
);
export const updateItemInCartAction = createAction(
    UPDATE_ITEM_IN_CART_ACTION,
    props<{ payload: CartItem }>()
);

export const loadFailureCartAction = createAction(
    LOAD_FAILURE_IN_CART_ACTION,
    props<{ error: AppMsg }>()
)




