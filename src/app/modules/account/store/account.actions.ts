import { Address } from 'src/app/models/address';
import { createAction, props } from '@ngrx/store';

export const addAddressAction = createAction(
    '[account]  add address',
    props<{payload: Address}>()
);

export const syncAddressesAction = createAction(
    '[account]  sync addresses',
    props<{payload: Address[]}>()
);

export const updateAddressAction = createAction(
    '[account]  update address',
    props<{payload: Address}>()
);

export const deleteAddressAction = createAction(
    '[account]  delete address',
    props<{payload: string}>()
);
