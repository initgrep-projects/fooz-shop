import { Action, createReducer, on } from '@ngrx/store';
import { clone, cloneDeep } from 'lodash';
import { AppMsg } from 'src/app/models/app-msg';
import { Category } from 'src/app/models/category';
import { Size } from 'src/app/models/size';
import { Sort } from 'src/app/models/Sort';
import {addAllCategoriesAction, addAllSizesAction, addAllSortOrdersAction, loadFailureAtFilter, selectedCategoriesAction, selectedSizesAction, selectSortOrderAction } from './filter.action';




export interface State {
    categories: Category[];
    selectedCategory: Category[];
    sizes: Size[];
    selectedSize: Size[];
    sortOrders: Sort[];
    selectedSortOrder: Sort;
    error: AppMsg
}

export const initialState: State = {
    categories: [],
    selectedCategory: [],
    sizes: [],
    selectedSize: [],
    sortOrders: [],
    selectedSortOrder: null,
    error: null
};

const filterReducer = createReducer(
    initialState,
    on(addAllCategoriesAction, (currentState, { payload }) => ({
        ...currentState,
        categories: [...payload]
    })),
    on(selectedCategoriesAction, (currentState, { payload }) => ({
        ...currentState,
        selectedCategory: [...payload]
    })),
    on(addAllSizesAction, (currentState, { payload }) => ({
        ...currentState,
        sizes: [...payload]
    })),
    on(selectedSizesAction, (currentState, { payload }) => ({
        ...currentState,
        selectedSize: [...payload]
    })),
    on(addAllSortOrdersAction, (currentState, { payload }) => ({
        ...currentState,
        sortOrders: [...payload]
    })),
    on(selectSortOrderAction, (currentState, { payload }) => ({
        ...currentState,
        selectedSortOrder: cloneDeep(payload)
    })),
    on(loadFailureAtFilter, (state, { error }) => ({
        ...state,
        error: clone(error)
    }))

);

export function FilterReducer(state: State = initialState, action: Action) {
    return filterReducer(state, action);
}

