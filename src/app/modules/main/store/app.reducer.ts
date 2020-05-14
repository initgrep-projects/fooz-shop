import * as fromHome from '../../home/store/home.reducer';
import * as fromShop from '../../shop/store/shop.reducer';
import * as fromFilters from '../../shop/filter-header/store/filter.reducer';
import * as fromCart from '../../cart/store/cart.reducer';

import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    home: fromHome.State;
    shop: fromShop.State;
    filters: fromFilters.State;
    cart: fromCart.State
}

export const AppReducer: ActionReducerMap<AppState> = {
    home: fromHome.HomeReducer,
    shop: fromShop.ShopReducer,
    filters: fromFilters.FilterReducer,
    cart: fromCart.CartReducer
};
