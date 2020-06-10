export const HOME_PAGE_FLAG = 'home';

export const CATEGORY_COLLECTION = 'category';
export const PRODUCT_COLLECTION = 'product';
export const SIZE_COLLECTION = 'size';
export const SORT_COLLECTION = 'sortorder';
export const CUSTOM_SIZE_INPUT = 'customsizeinput';
export const TREND_COLLECTION = 'trend';
export const CART_COLLECTION = 'cart';
export const PRODUCT_PAGE_SIZE = 20;
export const USER_COLLECTION = 'user';

export const ALERT_TITLE = 'alert';
export const OK_BUTTON = 'ok';
export const CANCEL_BUTTON = 'cancel';
export const CART_ITEM_EXIST = 'A similar product already exists in your cart. Would u like to add again?';
export const CART_ITEM_MAX_QUANTITY = 'You have added all the available products of this type.';


/**toast messages */
export const toastLabels = {
    itemAddedToCart: 'Item added to cart'
}



/**
 * Auth related messages
 */
export const AuthMessages = {
    invalidName: 'Name should be 100 characters or less',
    invalidEmail: 'please enter a valid email',
    invalidPhone: 'please provide a valid phone number with country code.(+971234512345)',
    invalidPassword: 'please provide password - must be 8 characters or more',
    invalidSignup: 'The email address is already in use by another account.',
    forgotpassword: 'forgot password ?',
    loginSuccess: 'Logged in successfully',
    logoutSuccess: 'logged out successfully',
    invalidCredentials: [
        { code: 'auth/wrong-password', message: 'Incorrect email or password' },
        { code: 'auth/user-not-found', message: 'The email is not registered with us' },
        { code: 'auth/popup-closed-by-user', message: "Google login was not successful" }
    ],
    authAnchorLabels: {
        profile: 'profile',
        welcome: 'welcome',
        welcomeAuthMsg: 'To access account and manange orders',
        login: 'log in',
        signup: 'sign up',
        signout: 'sign out',
        signinIn: 'signing in',
        signingUp: 'signing up',
        googleSignIn: 'sign in with google',
        manageProfile: 'Manage your profile',
        verifiedAccount: 'verified',
        verifyAccount: 'verify your account ?',
        orders: 'orders',
        addresses: 'Addresses',
        support: 'support',
        contact: 'contact us'
    }
};


