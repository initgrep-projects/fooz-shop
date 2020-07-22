import * as fromHome from '../../home/store/home.reducer';
import * as fromShop from '../../shop/store/shop.reducer';
import * as fromFilters from '../../shop/filters/store/filter.reducer';
import * as fromCart from '../../cart/store/cart.reducer';
import * as fromAuth from '../../auth/store/auth.reducer';
import * as fromAccount from '../../account/store/account.reducer';
import * as fromHeader from '../../header/store/header.reducer';

import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    header: fromHeader.State;
    home: fromHome.State;
    shop: fromShop.State;
    filters: fromFilters.State;
    cart: fromCart.State;
    auth: fromAuth.AuthState;
    account: fromAccount.AccountState;
}

export const AppReducer: ActionReducerMap<AppState> = {
    header: fromHeader.HomeReducer,
    home: fromHome.HomeReducer,
    shop: fromShop.ShopReducer,
    filters: fromFilters.FilterReducer,
    cart: fromCart.CartReducer,
    auth: fromAuth.AuthReducer,
    account: fromAccount.AccountReducer
};
