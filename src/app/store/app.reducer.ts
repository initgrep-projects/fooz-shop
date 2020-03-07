import * as fromShop from '../shop/store/shop.reducer';
import * as fromFilters from '../shop/filter-header/store/filter.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shop: fromShop.State;
    filters: fromFilters.State;
}

export const AppReducer: ActionReducerMap<AppState> = {
    shop: fromShop.ShopReducer,
    filters: fromFilters.FilterReducer
};
