import { createReducer, on, Action } from '@ngrx/store';

import { Product } from 'src/app/models/product';
import { addProductsToHomeAction } from './home.action';


export interface State {
    products: Product[];
}

export const initialState: State = {
    products : []
};

const homeReducer = createReducer(
    initialState,
    on(addProductsToHomeAction, (currentState, {payload}) => ({
        ...currentState,
        products : [ ...payload]
    }))
);

export function HomeReducer(state: State = initialState, action: Action){
    return homeReducer(state, action);
}

