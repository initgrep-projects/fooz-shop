import { Action, createReducer, on } from '@ngrx/store';
import { clone } from 'lodash';
import { Address } from 'src/app/models/address';
import { AppError } from 'src/app/models/app-error';
import { Country } from 'src/app/services/geo-address.service';
import { addAddressAction, addAddressesAction, addCountriesAction, deleteAddressAction, loadFailureInAccountAction, updateAddressAction } from './account.actions';



export interface AccountState {
    addresses: Address[];
    countries: Country[];
    error: AppError
}

export const initialState: AccountState = {
    addresses: null,
    countries: null,
    error: null
};

const theReducer = createReducer(
    initialState,
    on(addAddressesAction, (currentState, { payload }) => ({
        ...currentState,
        addresses: getSortedItems(!!payload ? [...payload] : null)
    })),
    on(addAddressAction, (currentState, { payload }) => ({
        ...currentState,
        addresses: getSortedItems([...currentState.addresses, payload])
    })),
    on(updateAddressAction, (currentState, { payload }) => ({
        ...currentState,
        addresses: getSortedItems([...currentState.addresses.filter(a => a.Id !== payload.Id), payload])
    })),
    on(deleteAddressAction, (currentState, { payload }) => ({
        ...currentState,
        addresses: getSortedItems(currentState.addresses.filter(c => c.Id !== payload))
    })),
    on(addCountriesAction, (currentState, { payload }) => ({
        ...currentState,
        countries: !!payload ? [...payload] : null
    })),
    on(loadFailureInAccountAction, (currentState, { error }) => ({
        ...currentState,
        error: clone(error)
    }))
);



function getSortedItems(address: Address[]) {
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

export function AccountReducer(state: AccountState = initialState, action: Action) {
    return theReducer(state, action);
}



