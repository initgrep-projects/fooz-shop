import { createReducer, on, Action } from '@ngrx/store';
import { fetchProductsAction } from './shop.actions';
import { Product } from 'src/app/models/product';


export interface State {
    products: Product[];
}

export const initialState: State = {
    products : []
};

const shopReducer = createReducer(
    initialState,
    on(fetchProductsAction, (currentState, {payload}) => ({
        ...currentState,
        products : [...payload]
    }))
);

export function ShopReducer(state: State = initialState, action: Action){
    return shopReducer(state, action);
}

