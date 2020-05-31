import { createReducer, on, Action } from '@ngrx/store';
import { addProductsAction, appendProductsAction, addCustomSizeInputAction, updateProductAction, addTrendItemsAction } from './shop.actions';
import { Product } from 'src/app/models/product';
import { CustomSizeInput } from 'src/app/models/custom-size';
import { cloneDeep } from 'lodash';
import { Image } from 'src/app/models/image';


export interface State {
    products: Product[];
    customSizeInput: CustomSizeInput;
    trendItems: Image[];
}

export const initialState: State = {
    products: [],
    customSizeInput: null,
    trendItems: []
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
    on(addTrendItemsAction, (currentState, { payload }) => ({
        ...currentState,
        trendItems: [...payload]
    }))
);

function updateProduct(products: Product[], p: Product) {
    const diffProducts = products.filter($p => $p.Id !== p.Id);
    return [...diffProducts, cloneDeep(p)];
}

export function ShopReducer(state: State = initialState, action: Action) {
    return shopReducer(state, action);
}

