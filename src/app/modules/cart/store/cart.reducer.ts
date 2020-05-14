import { createReducer, on, Action } from '@ngrx/store';
import {  addItemToCartAction, deleteItemInCartAction, updateItemInCartAction } from './cart.actions';
import { Product } from 'src/app/models/product';


export interface State {
    cart: Product[];
}

export const initialState: State = {
    cart: []
};

const cartReducer = createReducer(
    initialState,

    on(addItemToCartAction, (currentState, { payload }) => ({
        ...currentState,
        cart: [...currentState.cart, payload]
    })),
    on(deleteItemInCartAction, (currentState, { productId }) => ({
        ...currentState,
        cart: getDifferentialCart(currentState.cart, productId)
    })),
    on(updateItemInCartAction, (currentState, { payload }) => ({
        ...currentState,
        cart: getUpdatedCart(currentState.cart, payload)
    })),

);

function getDifferentialCart(products: Product[], id: string) {
    return [...products.splice(products.findIndex(product => product.Id === id), 1)];
}

function getUpdatedCart(products: Product[], product: Product) {
    const index = products.findIndex(p => p.Id === product.Id);
    products.splice(index, 1);
    return [...products, product];
}

export function CartReducer(state: State = initialState, action: Action) {
    return cartReducer(state, action);
}

