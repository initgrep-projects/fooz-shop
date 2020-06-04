import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const addUserAction = createAction(
    '[auth]  add user',
    props<{payload: User}>()
);
export const deleteUserAction = createAction(
    '[auth]  remove user',
    props<{payload: string}>()
);
