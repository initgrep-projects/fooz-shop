import * as fromShop from '../shop/store/shop.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState{
    shop: fromShop.State;
}

export const AppReducer: ActionReducerMap<AppState> = {
    shop: fromShop.ShopReducer
};
