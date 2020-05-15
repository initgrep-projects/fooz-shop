import { createReducer, on, Action } from '@ngrx/store';
import { addItemsToCartAction, addItemToCartAction, deleteItemInCartAction, updateItemInCartAction } from './cart.actions';
import { Product } from 'src/app/models/product';
import { CartItem } from 'src/app/models/cartItem';



export interface State {
    cart: CartItem[]
}

export const initialState: State = {
    cart:[] 
};

const cartReducer = createReducer(
    initialState,

    on(addItemsToCartAction, (currentState, { payload }) => ({
        ...currentState,
        cart: [...payload ]
    })),

    on(addItemToCartAction, (currentState, { payload }) => ({
        ...currentState,
        cart: [...currentState.cart, payload ]
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
    return [...cart.splice(cart.findIndex(item=> item.product.Id === id),1)];
}

function getUpdatedCart(cart: CartItem[], item: CartItem) {
    const index = cart.findIndex(p => p.product.Id === item.product.Id);
    cart.splice(index, 1);
    return [...cart, item];
}

export function CartReducer(state: State = initialState, action: Action) {
    return cartReducer(state, action);
}

