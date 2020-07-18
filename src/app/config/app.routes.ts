import { Routes } from '@angular/router';
import { AccountComponent } from '../modules/account/account.component';
import { AddressResolver } from '../modules/account/addresses/address-resolver.service';
import { AddressesComponent } from '../modules/account/addresses/addresses.component';
import { UserAddressEditComponent } from '../modules/account/addresses/user-address-edit/user-address-edit.component';
import { OrdersComponent } from '../modules/account/orders/orders.component';
import { OverviewComponent } from '../modules/account/overview/overview.component';
import { UserProfileEditComponent } from '../modules/account/profile/user-profile-edit/user-profile-edit.component';
import { UserProfileComponent } from '../modules/account/profile/user-profile/user-profile.component';
import { AuthGuardService } from '../modules/auth/auth-guard.service';
import { AuthModalComponent } from '../modules/auth/auth-modal/auth-modal.component';
import { CartModalComponent } from '../modules/cart/cart-modal/cart-modal.component';
import { AddressViewComponent } from '../modules/checkout/address-view/address-view.component';
import { CartViewComponent } from '../modules/checkout/cart-view/cart-view.component';
import { CheckoutComponent } from '../modules/checkout/checkout.component';
import { PaymentComponent } from '../modules/checkout/payment/payment.component';
import { HomeComponent } from '../modules/home/home.component';
import { ItemDetailComponent } from '../modules/shop/items/item-detail/item-detail.component';
import { ProductResolver } from '../modules/shop/product-resolver.service';
import { ShopComponent } from '../modules/shop/shop.component';

export const checkoutRoutes: Routes = [
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuardService],
    children:[
      {
        path: 'cart',
        component: CartViewComponent,
        canActivateChild: [AuthGuardService]
      },
      {
        path: 'address',
        component: AddressViewComponent,
        canActivateChild: [AuthGuardService]
        
      },
      {
        path: 'payment',
        component: PaymentComponent,
        canActivateChild: [AuthGuardService]
      }
    ]
  }
]

export const accountRoutes: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: OverviewComponent,
        canActivateChild: [AuthGuardService]
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivateChild: [AuthGuardService]
      },
      {
        path: 'addresses',
        component: AddressesComponent,
        canActivateChild: [AuthGuardService]
      },
      {
        path: 'addresses/edit/:id',
        component: UserAddressEditComponent,
        resolve: { address: AddressResolver },
        canActivateChild: [AuthGuardService]

      },
      {
        path: 'addresses/new',
        component: UserAddressEditComponent,
        canActivateChild: [AuthGuardService]
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        canActivateChild: [AuthGuardService]
      },
      {
        path: 'profile/edit',
        component: UserProfileEditComponent,
        canActivateChild: [AuthGuardService]
      }
    ]
  }
]

/** No Auth Guard service for cart */
export const cartRoutes: Routes = [
  {
    path: 'cart',
    component: CartModalComponent,
    outlet: 'md'
  },
];



export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  },

];

export const homeRoutes: Routes = [
  { path: 'home', component: HomeComponent }
];


export const shopRoutes: Routes = [
  {
    path: 'shop',
    component: ShopComponent,
  },
  {
    path: 'shop/item/:id',
    component: ItemDetailComponent,
    resolve: { product: ProductResolver },
  }

];

export const authRoutes: Routes = [
  {
    path: 'auth',
    component: AuthModalComponent,
    outlet: 'secure'
  }
]

