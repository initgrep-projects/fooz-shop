import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { AccountMenuComponent } from './menu/account-menu.component';
import { SharedModule } from '../shared/shared.module';
import { OverviewComponent } from './overview/overview.component';
import { OrdersComponent } from './orders/orders.component';
import { AddressesComponent } from './addresses/addresses.component';
import { ProfileComponent } from './profile/profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [AccountComponent, AccountMenuComponent, OverviewComponent, OrdersComponent, AddressesComponent, ProfileComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FontAwesomeModule,
    SharedModule
  ]
})
export class AccountModule { }
