import { Action, createReducer, on } from '@ngrx/store';
import { clone, cloneDeep } from 'lodash';
import { Address } from 'src/app/models/address';
import { AppMsg } from 'src/app/models/app-msg';
import { Order } from 'src/app/models/order.modal';
import { Country } from 'src/app/services/geo-address.service';
import { addAddressAction, addAddressesAction, addCountriesAction, addOrdersAction, deleteAddressAction, loadFailureInAccountAction, updateAddressAction, addSelectedOrderAction, addSelectedAddressAction } from './account.actions';



export interface AccountState {
    addresses: Address[];
    selectedAddress: Address,
    countries: Country[];
    orders: Order[];
    selectedOrder: Order;
    error: AppMsg;
}

export const initialState: AccountState = {
    addresses: null,
    selectedAddress: null,
    countries: null,
    orders: null,
    selectedOrder: null,
    error: null
};

const theReducer = createReducer(
    initialState,
    on(addAddressesAction, (currentState, { payload }) => ({
        ...currentState,
        addresses: getSortedAddresses(!!payload ? [...payload] : null)
    })),
    on(addAddressAction, (currentState, { payload }) => ({
        ...currentState,
        addresses: getSortedAddresses([...currentState.addresses, payload])
    })),
    on(updateAddressAction, (currentState, { payload }) => ({
        ...currentState,
        addresses: getSortedAddresses([...currentState.addresses.filter(a => a.Id !== payload.Id), payload])
    })),
    on(deleteAddressAction, (currentState, { payload }) => ({
        ...currentState,
        addresses: getSortedAddresses(currentState.addresses.filter(c => c.Id !== payload))
    })),
    on(addSelectedAddressAction, (currentState, { payload }) => ({
        ...currentState,
        selectedAddress: cloneDeep(payload)
    })),
    on(addCountriesAction, (currentState, { payload }) => ({
        ...currentState,
        countries: !!payload ? [...payload] : null
    })),
    on(addOrdersAction, (currentState, { payload }) => ({
        ...currentState,
        orders: getSortedOrders(!!payload ? [...payload] : null)
    })),
    on(addSelectedOrderAction, (currentState, { payload }) => ({
        ...currentState,
        selectedOrder: cloneDeep(payload)
    })),
    on(loadFailureInAccountAction, (currentState, { error }) => ({
        ...currentState,
        error: clone(error)
    }))
);



function getSortedAddresses<T extends { CreatedDate: number }>(address: T[]) {
    if (!address) { return null; }
    return address.sort((a, b) => {
        if (a.CreatedDate < b.CreatedDate) {
            return 1;
        }
        if (a.CreatedDate > b.CreatedDate) {
            return -1;
        }
        return 0;
    });
}

function getSortedOrders(orders: Order[]) {
    if (!orders) { return null; }
    return orders.sort((a, b) => {
        if (a.OrderItem.CreatedDate < b.OrderItem.CreatedDate) {
            return 1;
        }
        if (a.OrderItem.CreatedDate > b.OrderItem.CreatedDate) {
            return -1;
        }
        return 0;
    });
}

export function AccountReducer(state: AccountState = initialState, action: Action) {
    return theReducer(state, action);
}



