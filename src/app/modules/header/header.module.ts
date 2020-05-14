import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SearchComponent } from './nav-bar/search/search.component';
import { AccountComponent } from './nav-bar/account/account.component';

import { HeaderRoutingModule } from './header-routing.module';
import { CartModule } from '../cart/cart.module';

@NgModule({
  declarations: [
    HeaderComponent,
    TopBarComponent,
    NavBarComponent,
    SearchComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedModule,
    CartModule,
    HeaderRoutingModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
