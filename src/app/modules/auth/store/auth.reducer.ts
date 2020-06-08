import { User } from 'src/app/models/user';
import { createReducer, on, Action } from '@ngrx/store';
import { addUserAction, deleteUserAction } from './auth.actions';
import { cloneDeep} from 'lodash';



export interface AuthState {
    user: User;
}

export const initialState: AuthState = {
    user: null
};


const theReducer = createReducer(
    initialState,

    on(addUserAction, (currentState, { payload }) => ({
        ...currentState,
        user: cloneDeep(payload)
    })),

    on(deleteUserAction, (currentState, { payload }) => ({
        ...currentState,
        user: null
    })), 

);


export function AuthReducer(state: AuthState = initialState, action: Action) {
    return theReducer(state, action);
}


