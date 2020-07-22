import { Action, createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { Brand } from 'src/app/models/brand';
import { saveBrand } from './header.actions';

export interface State {
    brand: Brand
}
export const initialState: State = {
    brand: null
}

const theReducer = createReducer(
    initialState,
    on(saveBrand, (state, { payload }) => ({
        ...state,
        brand: cloneDeep(payload)
    }))
);

export function HomeReducer(state: State = initialState, action: Action) {
    return theReducer(state, action);
}
