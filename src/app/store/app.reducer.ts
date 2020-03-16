import * as fromHome from '../modules/home/store/home.reducer';
import * as fromShop from '../modules/shop/store/shop.reducer';
import * as fromFilters from '../modules/shop/filter-header/store/filter.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    home: fromHome.State;
    shop: fromShop.State;
    filters: fromFilters.State;
}

export const AppReducer: ActionReducerMap<AppState> = {
    home: fromHome.HomeReducer,
    shop: fromShop.ShopReducer,
    filters: fromFilters.FilterReducer
};
