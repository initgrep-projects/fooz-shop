import { Category } from 'src/app/models/category';
import { Size } from 'src/app/models/size';
import { fetchAllCategories, selectCategory, selectSize, fetchAllSizes } from './filter.action';
import { createReducer, on, Action } from '@ngrx/store';

import {cloneDeep} from 'lodash';



export interface State {
    categories: Category[];
    selectedCategory: Category;
    sizes: Size[];
    selectedSize: Size;
}

export const initialState: State = {
    categories : [],
    selectedCategory: null,
    sizes: [],
    selectedSize: null
};

const filterReducer = createReducer(
    initialState,
    on(fetchAllCategories, (currentState, {payload}) => ({
        ...currentState,
        categories : [...payload]
    })),
    on(selectCategory, (currentState, {payload}) => ({
        ...currentState,
        selectedCategory : cloneDeep(payload)
    })),
    on(fetchAllSizes, (currentState, {payload}) => ({
        ...currentState,
        sizes: [...payload]
    })),
    on(selectSize, (currentState, {payload}) => ({
        ...currentState,
        selectedSize : cloneDeep(payload)
    }))

);

export function FilterReducer(state: State = initialState, action: Action) {
    return filterReducer(state, action);
}

