import { createAction, props } from '@ngrx/store';
import { Address } from 'src/app/models/address';
import { AppMsg } from 'src/app/models/app-msg';
import { Order } from 'src/app/models/order.modal';
import { Country } from 'src/app/services/geo-address.service';
import { ADD_ADDRESSES_ACTION, ADD_ADDRESS_ACTION, ADD_COUNTRIES_ACTION, ADD_ORDERS_ACTION, DELETE_ADDRESS_ACTION, LOAD_ADDRESSES_ACTION, LOAD_COUNTRIES_ACTION, LOAD_FAILURE_IN_ACCOUNT_ACTION, LOAD_ORDERS_ACTION, UPDATE_ADDRESS_ACTION, LOAD_SELECTED_ORDER_ACTION, ADD_SELECTED_ORDER_ACTION } from 'src/app/util/app.constants';

export const loadAddressesAction = createAction(
    LOAD_ADDRESSES_ACTION
);

export const loadSelectedAddressAction = createAction(
    LOAD_SELECTED_ORDER_ACTION,
    props<{ addressId: string }>()
);

export const addAddressesAction = createAction(
    ADD_ADDRESSES_ACTION,
    props<{ payload: Address[] }>()
);

export const addAddressAction = createAction(
    ADD_ADDRESS_ACTION,
    props<{ payload: Address }>()
);
export const addSelectedAddressAction = createAction(
    ADD_SELECTED_ORDER_ACTION,
    props<{ payload: Address }>()
);

export const updateAddressAction = createAction(
    UPDATE_ADDRESS_ACTION,
    props<{ payload: Address }>()
);

export const deleteAddressAction = createAction(
    DELETE_ADDRESS_ACTION,
    props<{ payload: string }>()
);

export const loadCountriesAction = createAction(
    LOAD_COUNTRIES_ACTION
);
export const addCountriesAction = createAction(
    ADD_COUNTRIES_ACTION,
    props<{ payload: Country[] }>()
);

export const loadOrdersAction = createAction(
    LOAD_ORDERS_ACTION,
    props<{ paginate: boolean }>()
);
export const addOrdersAction = createAction(
    ADD_ORDERS_ACTION,
    props<{ payload: Order[] }>()
);
export const loadSelectedOrderAction = createAction(
    LOAD_SELECTED_ORDER_ACTION,
    props<{ orderId: string }>()
);
export const addSelectedOrderAction = createAction(
    ADD_SELECTED_ORDER_ACTION,
    props<{ payload: Order }>()
);

export const loadFailureInAccountAction = createAction(
    LOAD_FAILURE_IN_ACCOUNT_ACTION,
    props<{ error: AppMsg }>()
);
