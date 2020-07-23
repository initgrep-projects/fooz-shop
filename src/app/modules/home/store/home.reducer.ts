import { Action, createReducer, on } from '@ngrx/store';
import { clone } from 'lodash';
import { AppMsg } from 'src/app/models/app-msg';
import { Image } from 'src/app/models/image';
import { LookBookItem } from 'src/app/models/lookbook';
import { Product } from 'src/app/models/product';
import { addlatestProducts, addLookBookItems, addTrendItems, loadFailureAtHome } from './home.action';

export interface State {
    lookbook: LookBookItem[];
    latestsProducts: Product[];
    trend: Image[];
    error: AppMsg;
}

export const initialState: State = {
    lookbook: null,
    latestsProducts: null,
    trend: null,
    error: null
};

const theReducer = createReducer(
    initialState,

    on(addLookBookItems, (state, { payload }) => ({
        ...state,
        lookbook: [...payload]
    })),
    on(addlatestProducts, (state, { payload }) => ({
        ...state,
        latestsProducts: [...payload]
    })),
    on(addTrendItems, (state, { payload }) => ({
        ...state,
        trend: [...payload]
    })),
    on(loadFailureAtHome, (state, { error }) => ({
        ...state,
        error: clone(error)
    }))

);

export function HomeReducer(state: State = initialState, action: Action) {
    return theReducer(state, action);
}

