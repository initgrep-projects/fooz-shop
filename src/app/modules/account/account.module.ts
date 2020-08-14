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
import { NgbTypeaheadModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { AccountEffects } from './store/account.effects';
import { OrderComponent } from './orders/order/order.component';
import { OrderDetailComponent } from './orders/order/order-detail/order-detail.component';
import { UserPillComponent } from './user-pill/user-pill.component';
import { OrderPriceComponent } from './orders/order/order-detail/order-price/order-price.component';
import { OrderAddressComponent } from './orders/order/order-detail/order-address/order-address.component';
import { OrderStatusComponent } from './orders/order/order-detail/order-status/order-status.component';
import { OrderProductsComponent } from './orders/order/order-products/order-products.component';




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
    OrderComponent,
    OrderDetailComponent,
    UserPillComponent,
    OrderPriceComponent,
    OrderAddressComponent,
    OrderStatusComponent,
    OrderProductsComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FontAwesomeModule,
    SharedModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    EffectsModule.forFeature([AccountEffects]),
    NgbTooltipModule
  ]
})
export class AccountModule { }
