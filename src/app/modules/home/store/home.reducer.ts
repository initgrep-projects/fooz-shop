import { createReducer, on, Action } from '@ngrx/store';

import { Product } from 'src/app/models/product';
import { addProductsToHomeAction, addTrendItemsAction } from './home.action';


export interface State {
    products: Product[];
    trendItems: string[];
}

export const initialState: State = {
    products : [],
    trendItems: []
};

const homeReducer = createReducer(
    initialState,
    on(addProductsToHomeAction, (currentState, {payload}) => ({
        ...currentState,
        products : [ ...payload]
    })),
    on(addTrendItemsAction, (currentState, {payload}) => ({
        ...currentState,
        trendItems : [ ...payload]
    }))
);

export function HomeReducer(state: State = initialState, action: Action){
    return homeReducer(state, action);
}

