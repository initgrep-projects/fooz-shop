import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/models/category';

export const fetchAllCategories = createAction(
    '[category] fetch all categories',
    props<{ payload: Category[] }>()
);

export const selectCategory = createAction(
    '[category] select category',
    props<{ payload: Category }>()
);
