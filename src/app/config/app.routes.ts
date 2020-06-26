import { Routes } from '@angular/router';
import { AccountComponent } from '../modules/account/account.component';
import { OverviewComponent } from '../modules/account/overview/overview.component';
import { OrdersComponent } from '../modules/account/orders/orders.component';
import { AddressesComponent } from '../modules/account/addresses/addresses.component';
import { UserProfileComponent } from '../modules/account/profile/user-profile/user-profile.component';
import { UserProfileEditComponent } from '../modules/account/profile/user-profile-edit/user-profile-edit.component';
import { UserAddressEditComponent } from '../modules/account/addresses/user-address-edit/user-address-edit.component';
import { AddressResolver } from '../modules/account/addresses/address-resolver.service';
import { AuthGuardService } from '../modules/auth/auth-guard.service';
import { CartModalComponent } from '../modules/cart/cart-modal/cart-modal.component';

export const accountRoutes: Routes = [
  {
    path: 'my/account',
    component: AccountComponent,
    canActivate:[AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: OverviewComponent,
        canActivateChild:[AuthGuardService]
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivateChild:[AuthGuardService]
      },
      {
        path: 'addresses',
        component: AddressesComponent,
        canActivateChild:[AuthGuardService]
      },
      {
        path: 'address/edit/:id',
        component: UserAddressEditComponent,
        resolve: { address: AddressResolver },
        canActivateChild:[AuthGuardService]

      },
      {
        path: 'address/new',
        component: UserAddressEditComponent,
        canActivateChild:[AuthGuardService]
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        canActivateChild:[AuthGuardService]
      },
      {
        path: 'profile/edit',
        component: UserProfileEditComponent,
        canActivateChild:[AuthGuardService]
      }
    ]
  }
]

/** No Auth Guard service for cart */
export const cartRoutes:Routes = [
  {
    path: 'cart',
    component: CartModalComponent,
    outlet: 'md'
  },
];