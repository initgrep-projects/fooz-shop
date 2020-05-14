import { createReducer, on, Action } from '@ngrx/store';
import { addProductsAction, appendProductsAction, addCustomSizeInputAction } from './shop.actions';
import { Product } from 'src/app/models/product';
import { CustomSizeInput } from 'src/app/models/custom-size';
import { cloneDeep } from 'lodash';


export interface State {
    products: Product[];
    customSizeInput: CustomSizeInput;
}

export const initialState: State = {
    products: [],
    customSizeInput: null,
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
    }))
);


export function ShopReducer(state: State = initialState, action: Action) {
    return shopReducer(state, action);
}

