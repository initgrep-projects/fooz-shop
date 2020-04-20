import { createReducer, on, Action } from '@ngrx/store';
import { addProductsAction, appendProductsAction, addCustomSizeInputAction, addItemToCartAction, deleteItemInCartAction, updateItemInCartAction } from './shop.actions';
import { Product } from 'src/app/models/product';
import { CustomSizeInput } from 'src/app/models/custom-size';
import { cloneDeep } from 'lodash';


export interface State {
    products: Product[];
    customSizeInput: CustomSizeInput;
    cart: Product[];
}

export const initialState: State = {
    products: [],
    customSizeInput: null,
    cart: []
};

const shopReducer = createReducer(
    initialState,
    on(addProductsAction, (currentState, { payload }) => ({
        ...currentState,
        products: [...payload]
    })),
    on(appendProductsAction, (currentState, { payload }) => ({
        ...currentState,
        products: [...currentState.products, ...payload]
    })),
    on(addCustomSizeInputAction, (currentState, { payload }) => ({
        ...currentState,
        customSizeInput: cloneDeep(payload)
    })),
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

export function ShopReducer(state: State = initialState, action: Action) {
    return shopReducer(state, action);
}

