import { Routes } from '@angular/router';
import { AccountComponent } from '../modules/account/account.component';
import { OverviewComponent } from '../modules/account/overview/overview.component';
import { OrdersComponent } from '../modules/account/orders/orders.component';
import { AddressesComponent } from '../modules/account/addresses/addresses.component';
import { UserProfileComponent } from '../modules/account/profile/user-profile/user-profile.component';
import { UserProfileEditComponent } from '../modules/account/profile/user-profile-edit/user-profile-edit.component';
import { UserAddressEditComponent } from '../modules/account/addresses/user-address-edit/user-address-edit.component';
import { AddressResolver } from '../modules/account/addresses/address-resolver.service';

export const accountRoutes: Routes = [
  {
    path: 'my/account',
    component: AccountComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: OverviewComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'addresses',
        component: AddressesComponent
      },
      {
        path: 'address/edit/:id',
        component: UserAddressEditComponent,
        resolve: { address: AddressResolver }

      },
      {
        path: 'address/new',
        component: UserAddressEditComponent
      },
      {
        path: 'profile',
        component: UserProfileComponent
      },
      {
        path: 'profile/edit',
        component: UserProfileEditComponent
      }
    ]
  }
]