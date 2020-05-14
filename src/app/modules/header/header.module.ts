import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SearchComponent } from './nav-bar/search/search.component';
import { AccountComponent } from './nav-bar/account/account.component';
import { CartComponent } from './nav-bar/cart/cart.component';
import { CartItemsComponent } from './nav-bar/cart/cart-items/cart-items.component';
import { CartModalComponent } from './nav-bar/cart/cart-modal/cart-modal.component';
import { HeaderRoutingModule } from './header-routing.module';

@NgModule({
  declarations: [
    HeaderComponent,
    TopBarComponent,
    NavBarComponent,
    SearchComponent,
    AccountComponent,
    CartComponent,
    CartItemsComponent,
    CartModalComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedModule,
    HeaderRoutingModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
