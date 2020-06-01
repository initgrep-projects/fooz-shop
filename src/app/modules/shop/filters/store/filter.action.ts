import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/models/category';
import { Size } from 'src/app/models/size';
import { Sort } from 'src/app/models/Sort';

export const saveAllCategoriesAction = createAction(
    '[category] save all categories',
    props<{ payload: Category[] }>()
);


export const selectedCategoriesAction = createAction(
    '[category] select category',
    props<{ payload: Category[] }>()
);

export const saveAllSizesAction = createAction(
    '[size] save all sizes',
    props<{ payload: Size[] }>()
); 

export const selectedSizesAction = createAction(
    '[size] select size',
    props<{ payload: Size[] }>()
);


export const saveAllSortOrdersAction = createAction(
    '[sort] save all sort orders',
    props<{ payload: Sort[] }>()
);

export const  selectSortOrderAction = createAction(
    '[sort] select sort order',
    props<{ payload: Sort }>()
);