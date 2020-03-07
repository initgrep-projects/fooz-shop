import { Category } from 'src/app/models/category';
import { fetchAllCategories, selectCategory } from './filter.action';
import { createReducer, on, Action } from '@ngrx/store';

import {cloneDeep} from 'lodash';



export interface State {
    categories: Category[];
    selectedCategory: Category;
}

export const initialState: State = {
    categories : [],
    selectedCategory: null
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
    }))

);

export function FilterReducer(state: State = initialState, action: Action) {
    return filterReducer(state, action);
}

