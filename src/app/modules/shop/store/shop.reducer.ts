import { Action, createReducer, on } from '@ngrx/store';
import { cloneDeep, clone } from 'lodash';
import { CustomSizeInput } from 'src/app/models/custom-size';
import { Product } from 'src/app/models/product';
import { addCustomSizeInputAction, addProductsAction, appendProductsAction, updateProductAction, loadFailureAtShop } from './shop.actions';
import { AppMsg } from 'src/app/models/app-msg';


export interface State {
    products: Product[];
    customSizeInput: CustomSizeInput;
    error: AppMsg
}

export const initialState: State = {
    products: [],
    customSizeInput: null,
    error: null
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
    on(updateProductAction, (currentState, { payload }) => ({
        ...currentState,
        products: updateProduct(currentState.products, payload)
    })),
    on(addCustomSizeInputAction, (currentState, { payload }) => ({
        ...currentState,
        customSizeInput: cloneDeep(payload)
    })),
    on(loadFailureAtShop, (state, { error }) => ({
        ...state,
        error: clone(error)
    }))
);

function updateProduct(products: Product[], p: Product) {
    const diffProducts = products.filter($p => $p.Id !== p.Id);
    return [...diffProducts, cloneDeep(p)];
}

export function ShopReducer(state: State = initialState, action: Action) {
    return shopReducer(state, action);
}

