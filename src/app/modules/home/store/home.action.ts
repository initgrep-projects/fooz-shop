import { LookBookItem } from 'src/app/models/lookbook';
import { createAction, props } from '@ngrx/store';


export const adddLookBookItems = createAction(
    '[lookbook]  add lookbook items',
    props<{payload: LookBookItem[]}>()
);