import { createReducer, on, Action } from '@ngrx/store';
import { addItemsToCartAction, addItemToCartAction, deleteItemInCartAction, updateItemInCartAction } from './cart.actions';
import { CartItem } from 'src/app/models/cartItem';
import { cloneDeep } from 'lodash';
import { isIdentical } from 'src/app/helpers/util';


export interface State {
    cart: CartItem[];
}

export const initialState: State = {
    cart: []
};

const cartReducer = createReducer(
    initialState,

    on(addItemsToCartAction, (currentState, { payload }) => ({
        ...currentState,
        cart: getSortedItems([...payload])
    })),

    on(addItemToCartAction, (currentState, { payload }) => ({
        ...currentState,
        cart: getSortedItems( [...currentState.cart, cloneDeep(payload)])
    })),
    on(deleteItemInCartAction, (currentState, { payload }) => ({
        ...currentState,
        cart: getDifferentialCart(currentState.cart, payload)
    })),
    on(updateItemInCartAction, (currentState, { payload }) => ({
        ...currentState,
        cart: getUpdatedCart(currentState.cart, payload)
    })),

);

function getSortedItems(items: CartItem[]){
   return items.sort((a,b) => {
        if(a.CreatedDate < b.CreatedDate) {
            return 1;
        } 
        if(a.CreatedDate > b.CreatedDate) {
            return -1;
        }
        return 0;
    });
}

function getDifferentialCart(cart: CartItem[], id: string) {
    return getSortedItems(cart.filter(item => item.Id !== id));
}

function getUpdatedCart(cart: CartItem[], item: CartItem) {
    const newCart = cart.filter(_item => !_item.equals(item));
    return getSortedItems([...newCart, cloneDeep(item)]);
}



export function CartReducer(state: State = initialState, action: Action) {
    return cartReducer(state, action);
}

