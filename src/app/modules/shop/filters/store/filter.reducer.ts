import { Category } from 'src/app/models/category';
import { Size } from 'src/app/models/size';
import { createReducer, on, Action } from '@ngrx/store';

import { cloneDeep } from 'lodash';
import { Sort } from 'src/app/models/Sort';
import { saveAllCategoriesAction, selectedCategoriesAction, saveAllSizesAction, selectedSizesAction, saveAllSortOrdersAction, selectSortOrderAction } from './filter.action';



export interface State {
    categories: Category[];
    selectedCategory: Category[];

    sizes: Size[];
    selectedSize: Size[];

    sortOrders: Sort[];
    selectedSortOrder: Sort;
}

export const initialState: State = {
    categories: [],
    selectedCategory: [],

    sizes: [],
    selectedSize: [],
    
    sortOrders: [],
    selectedSortOrder: null
};

const filterReducer = createReducer(
    initialState,
    on(saveAllCategoriesAction, (currentState, { payload }) => ({
        ...currentState,
        categories: [...payload]
    })),
    on(selectedCategoriesAction, (currentState, { payload }) => ({
        ...currentState,
        selectedCategory: [...payload]
    })),
    on(saveAllSizesAction, (currentState, { payload }) => ({
        ...currentState,
        sizes: [...payload]
    })),
    on(selectedSizesAction, (currentState, { payload }) => ({
        ...currentState,
        selectedSize: [...payload]
    })),
    on(saveAllSortOrdersAction, (currentState, { payload }) => ({
        ...currentState,
        sortOrders: [...payload]
    })),
    on(selectSortOrderAction, (currentState, { payload }) => ({
        ...currentState,
        selectedSortOrder: cloneDeep(payload)
    }))

);

export function FilterReducer(state: State = initialState, action: Action) {
    return filterReducer(state, action);
}

