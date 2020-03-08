import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/models/category';
import { Size } from 'src/app/models/size';
import { Sort } from 'src/app/models/Sort';

export const fetchAllCategories = createAction(
    '[category] fetch all categories',
    props<{ payload: Category[] }>()
);


export const selectCategory = createAction(
    '[category] select category',
    props<{ payload: Category }>()
);

export const fetchAllSizes = createAction(
    '[size] fetch all sizes',
    props<{ payload: Size[] }>()
);

export const selectSize = createAction(
    '[size] select size',
    props<{ payload: Size }>()
);


export const fetchAllSortOrders = createAction(
    '[sort] fetch all sort orders',
    props<{ payload: Sort[] }>()
);

export const  selectSortOrder = createAction(
    '[sort] select sort order',
    props<{ payload: Sort }>()
);