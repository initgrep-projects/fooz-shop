import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SearchComponent } from './nav-bar/search/search.component';

import { HeaderRoutingModule } from './header-routing.module';
import { CartModule } from '../cart/cart.module';
import { AuthModule } from '../auth/auth.module';
import { SideNavComponent } from './side-nav/side-nav.component';

@NgModule({
  declarations: [
    HeaderComponent,
    TopBarComponent,
    NavBarComponent,
    SearchComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    HeaderRoutingModule,
    SharedModule,
    CartModule,
    AuthModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
