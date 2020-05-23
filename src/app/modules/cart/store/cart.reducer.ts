import { createReducer, on, Action } from '@ngrx/store';
import { addItemsToCartAction, addItemToCartAction, deleteItemInCartAction, updateItemInCartAction } from './cart.actions';
import { CartItem } from 'src/app/models/cartItem';
import { cloneDeep } from 'lodash';
import { isIdentical } from 'src/app/helpers/util';


export interface State {
    cart: CartItem[];
}

export const initialState: State = {
    cart: []
};

const cartReducer = createReducer(
    initialState,

    on(addItemsToCartAction, (currentState, { payload }) => ({
        ...currentState,
        cart: [...payload]
    })),

    on(addItemToCartAction, (currentState, { payload }) => ({
        ...currentState,
        cart: [...currentState.cart, cloneDeep(payload)]
    })),
    on(deleteItemInCartAction, (currentState, { payload }) => ({
        ...currentState,
        cart: getDifferentialCart(currentState.cart, payload)
    })),
    on(updateItemInCartAction, (currentState, { payload }) => ({
        ...currentState,
        cart: getUpdatedCart(currentState.cart, payload)
    })),

);

function getDifferentialCart(cart: CartItem[], id: string) {
    return [...cart.splice(cart.findIndex(item => item.Product.Id === id), 1)];
}

function getUpdatedCart(cart: CartItem[], item: CartItem) {
    const newCart = cart.filter(_item => !_item.equals(item));
    return [...newCart, cloneDeep(item)];
}



export function CartReducer(state: State = initialState, action: Action) {
    return cartReducer(state, action);
}

