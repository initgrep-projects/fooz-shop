import { createReducer, on, Action } from '@ngrx/store';
import { LookBookItem } from 'src/app/models/lookbook';
import { adddLookBookItems } from './home.action';

export interface State {
    lookbook: LookBookItem[];
}

export const initialState: State = {
    lookbook: null
};

const theReducer = createReducer(
    initialState,

    on(adddLookBookItems, (state, { payload }) => ({
        ...state,
        lookbook: [...payload]
    })),
);

export function HomeReducer(state: State = initialState, action: Action) {
    return theReducer(state, action);
}

