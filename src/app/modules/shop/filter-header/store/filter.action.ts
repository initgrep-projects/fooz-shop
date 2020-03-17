import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/models/category';
import { Size } from 'src/app/models/size';
import { Sort } from 'src/app/models/Sort';

export const saveAllCategories = createAction(
    '[category] save all categories',
    props<{ payload: Category[] }>()
);


export const selectCategory = createAction(
    '[category] select category',
    props<{ payload: Category }>()
);

export const saveAllSizes = createAction(
    '[size] save all sizes',
    props<{ payload: Size[] }>()
);

export const selectSize = createAction(
    '[size] select size',
    props<{ payload: Size }>()
);


export const saveAllSortOrders = createAction(
    '[sort] save all sort orders',
    props<{ payload: Sort[] }>()
);

export const  selectSortOrder = createAction(
    '[sort] select sort order',
    props<{ payload: Sort }>()
);