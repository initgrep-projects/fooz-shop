export const HOME_PAGE_FLAG = 'home';
export const CATEGORY_COLLECTION = 'category';
export const PRODUCT_COLLECTION = 'product';
export const SIZE_COLLECTION = 'size';
export const BRAND_COLLECTION = 'brand';
export const SORT_COLLECTION = 'sortorder';
export const CUSTOM_SIZE_INPUT = 'customsizeinput';
export const TREND_COLLECTION = 'trend';
export const CART_COLLECTION = 'cart';
export const PRODUCT_PAGE_SIZE = 20;
export const USER_COLLECTION = 'user';
export const ADDRESS_COLLECTION = 'address';
export const LOOKBOOK_COLLECTION = "lookbook";
export const ORDER_ITEM_COLLECTION = 'order';
export const ORDER_STATUS_COLLECTION = 'orderStatus';
export const PAYMENT_COLLECTION = 'payment';
export const COUPON_COLLECTION = 'coupon';


export const ALERT_TITLE = 'alert';
export const DUPLICATE_ALERT_TITLE = 'Duplicate item';
export const REMOVE_ALERT_TITLE = "remove item";
export const UPDATE_ALERT_TITLE = 'Update item';
export const REMOVE_ALERT_MSG = 'Are you sure you want to remove this item?'
export const DUPLICATE_ALERT_MSG = 'Are you sure you want to add this item again?';
export const UPDATE_ALERT_MSG = 'Are you sure you want to update the item?';
export const OK_BUTTON = 'ok';
export const ADD_BUTTON = 'add';
export const REMOVE_BUTTON = 'remove';
export const CANCEL_BUTTON = 'cancel';

export const CART_ITEM_MAX_QUANTITY = 'You have added all the available products of this type.';

/**Error Constants */
export const DATA_LOAD_ERROR = 'Connection Error';
export const DATA_LOAD_ERROR_DETAILS = 'we are unable to connect to server. please check your internet connection';

/** store action constants */

export const LOAD_BRAND_ACTION = '[header] load brand';
export const SAVE_BRAND_ACTION = '[header] save brand';
export const LOAD_BRAND_FAILURE_ACTION = '[header] load failure';

export const LOAD_FAILURE_FOR_HOME_ACTION = '[home ] load  failure';
export const LOAD_LOOKBOOK_ITEMS_ACTION = '[home ] load lookbookItems';
export const ADD_LOOKBOOK_ITEMS_ACTION = '[home ]  add lookbook items';
export const LOAD_LATEST_PRODUCTS_ACTION = '[home ] load latestProducts';
export const ADD_LATEST_PRODUCTS_ACTION = '[home] add latestProducts';
export const LOAD_TREND_ITEMS_ACTION = '[home] load trend items';
export const ADD_TREND_ITEMS_ACTION = '[home] add trend items';

export const LOAD_FAILURE_FOR_SHOP_ACTION = '[shop] load  failure';
export const LOAD_PRODUCTS_ACTION = '[shop] load products';
export const LOAD_MORE_PRODUCTS_ACTION = '[shop] load more products';
export const ADD_PRODUCTS_ACTION = '[shop] add products';
export const APPEND_PRODUCTS_ACTION = '[shop] append products';
export const UPDATE_PRODUCTS_ACTION = '[shop] update product';
export const LOAD_CUSTOMSIZE_INPUT_ACTION = '[shop] load customsize inputs';
export const ADD_CUSTOMZIE_INPUT_ACTION = '[shop] add Custom Size Inputs';

export const LOAD_ALL_CATEGORY_ACTION = '[Filter] load all categories';
export const ADD_ALL_CATEGORIES_ACTION = '[Filter] add all categories';
export const SELECTED_CATEGORIES_ACTION = '[Filter] selected categories';
export const LOAD_ALL_SIZES_ACTION = '[Filter] load all sizes';
export const ADD_ALL_SIZES_ACTION = '[Filter] add all sizes';
export const SELECTED_SIZES_ACTION = '[Filter] selected sizes';
export const LOAD_ALL_SORT_ORDERS_ACTION = '[Filter] load all sort orders';
export const ADD_ALL_SORT_ORDERS_ACTION = '[Filter] add all sort orders';
export const SELECT_SORT_ORDER_ACTION = '[Filter] select sort order';
export const LOAD_FAILURE_FOR_FILTER_ACTION = '[Filter] load failure'

export const LOAD_CART_ACTION = '[cart] load items';
export const ADD_ITEMS_TO_CART_ACTION = '[cart]  add items';
export const ADD_ITEM_TO_CART_ACTION = '[cart]  add item';
export const DELETE_ITEM_IN_CART_ACTION = '[cart]  delete item';
export const UPDATE_ITEM_IN_CART_ACTION = '[cart]  update item';
export const LOAD_FAILURE_IN_CART_ACTION = '[cart] load failure';

export const LOAD_ADDRESSES_ACTION = '[account] load all Addresses';
export const LOAD_SELECTED_ADDRESS_ACTION = '[account] load selected Address';
export const ADD_ADDRESSES_ACTION = '[account]  add all addresses';
export const ADD_ADDRESS_ACTION = '[account]  add address';
export const ADD_SELECTED_ADDRESS_ACTION = '[account]  add selected address';
export const UPDATE_ADDRESS_ACTION = '[account]  update address';
export const DELETE_ADDRESS_ACTION = '[account]  delete address';
export const LOAD_COUNTRIES_ACTION = '[account] load  countries';
export const ADD_COUNTRIES_ACTION = '[account] add countries';
export const LOAD_ORDERS_ACTION = '[account] load orders';
export const LOAD_SELECTED_ORDER_ACTION = '[account] load selected order';
export const ADD_ORDERS_ACTION = '[account] add orders';
export const ADD_SELECTED_ORDER_ACTION = '[account] add selected orders';
export const LOAD_FAILURE_IN_ACCOUNT_ACTION = '[account] load failure';