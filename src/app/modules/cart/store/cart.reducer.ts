import { createReducer, on, Action } from '@ngrx/store';
import { addItemsToCartAction, addItemToCartAction, deleteItemInCartAction, updateItemInCartAction, loadFailureCartAction } from './cart.actions';
import { CartItem } from 'src/app/models/cartItem';
import { cloneDeep, clone } from 'lodash';
import { AppMsg } from 'src/app/models/app-msg';


export interface State {
    cart: CartItem[];
    error: AppMsg;
}

export const initialState: State = {
    cart: null,
    error: null
};

const cartReducer = createReducer(
    initialState,

    on(addItemsToCartAction, (currentState, { payload }) => ({
        ...currentState,
        cart: getSortedItems(!!payload ? [...payload] : null)
    })),

    on(addItemToCartAction, (currentState, { payload }) => ({
        ...currentState,
        cart: getSortedItems([...currentState.cart, cloneDeep(payload)])
    })),
    on(deleteItemInCartAction, (currentState, { payload }) => ({
        ...currentState,
        cart: getDifferentialCart(currentState.cart, payload)
    })),
    on(updateItemInCartAction, (currentState, { payload }) => ({
        ...currentState,
        cart: getUpdatedCart(currentState.cart, payload)
    })),
    on(loadFailureCartAction, (currentState, { error }) => ({
        ...currentState,
        error: clone(error)
    }))

);

function getSortedItems(items: CartItem[]) {
    console.log("sorted items for cart ", items);
    if (!items ) { return null; }
    return items.sort((a, b) => {
        if (a.CreatedDate < b.CreatedDate) {
            return 1;
        }
        if (a.CreatedDate > b.CreatedDate) {
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

