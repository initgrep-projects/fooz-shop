
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
    emailVerification: 'Verification email sent',
    emailVerificationFailed: 'Verification email failed',
    passwordReset: 'Password Reset email sent',
    passwordResetFail: 'password reset email failed',
    invalidCredentials: [
        { code: 'auth/wrong-password', message: 'Incorrect email or password' },
        { code: 'auth/user-not-found', message: 'The email is not registered with us' },
        { code: 'auth/popup-closed-by-user', message: "Google login was not successful" }
    ],
    authAnchorLabels: {
        profile: 'profile',
        cart: 'cart',
        brandName: 'fooz',
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
        notVerifyAccount: 'pending verification',
        orders: 'orders',
        addresses: 'Addresses',
        support: 'support',
        contact: 'contact us',
        home: 'home',
        shop: 'shop',
        
    }
};

export const cartLabels = {
        cart: 'shopping cart',
        goToShopping: 'go to shoping',
        goToCheckout: 'checkout items',
        emptyCart: 'your cart is empty'
}

export const itemLabels = {
    noColorProvided: 'please select a color',
    noSizeProvided: 'please select a size',
    noCategoryProvided: 'please select a category',
    noQuantityProvided: 'please provide the quantity'

}

export const featureItemsLabels = {
    parallaxTitle: 'Top Selling Abayas',
    title: 'order now'
}


