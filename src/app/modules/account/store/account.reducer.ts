import { Address } from 'src/app/models/address';
import { createReducer, on, Action } from '@ngrx/store';
import { addAddressAction, updateAddressAction, deleteAddressAction, syncAddressesAction } from './account.actions';



export interface AccountState {
    addresses: Address[];
}

export const initialState: AccountState = {
    addresses: []
};

const theReducer = createReducer(
    initialState,

    on(addAddressAction, (currentState, { payload }) => ({
        ...currentState,
        addresses: getSortedItems([...currentState.addresses, payload])
    })),
    on(syncAddressesAction, (currentState, { payload }) => ({
        ...currentState,
        addresses: getSortedItems([ ...payload])
    })),
    on(updateAddressAction, (currentState, { payload }) => ({
        ...currentState,
        addresses: getSortedItems([...currentState.addresses.filter(a => a.Id !== payload.Id), payload])
    })),
    on(deleteAddressAction, (currentState, { payload }) => ({
        ...currentState,
        addresses: getSortedItems(currentState.addresses.filter(c => c.Id !== payload))
    }))
);

function getSortedItems(address: Address[]) {
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

export function AccountReducer(state: AccountState = initialState, action: Action) {
    return theReducer(state, action);
}



