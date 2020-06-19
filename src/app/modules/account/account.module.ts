import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { AccountMenuComponent } from './menu/account-menu.component';
import { SharedModule } from '../shared/shared.module';
import { OverviewComponent } from './overview/overview.component';
import { OrdersComponent } from './orders/orders.component';
import { AddressesComponent } from './addresses/addresses.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { UserProfileEditComponent } from './profile/user-profile-edit/user-profile-edit.component';
import { UserAddressEditComponent } from './addresses/user-address-edit/user-address-edit.component';
import { UserAddressComponent } from './addresses/user-address/user-address.component';



@NgModule({
  declarations: [
    AccountComponent,
    AccountMenuComponent,
    OverviewComponent,
    OrdersComponent,
    AddressesComponent,
    UserProfileEditComponent,
    UserProfileComponent,
    UserAddressEditComponent,
    UserAddressComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FontAwesomeModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
