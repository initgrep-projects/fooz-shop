import { createReducer, on, Action } from '@ngrx/store';

export interface State {
}

export const initialState: State = {

};

const homeReducer = createReducer(
    initialState
);

export function HomeReducer(state: State = initialState, action: Action) {
    return homeReducer(state, action);
}

