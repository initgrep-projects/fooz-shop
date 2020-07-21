import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthModule } from '../auth/auth.module';
import { CartModule } from '../cart/cart.module';
import { SharedModule } from '../shared/shared.module';
import { HeaderRoutingModule } from './header-routing.module';
import { HeaderComponent } from './header.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SearchComponent } from './nav-bar/search/search.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SecNavBarComponent } from './sec-nav-bar/sec-nav-bar.component';
import { InfoBarComponent } from './info-bar/info-bar.component';



@NgModule({
  declarations: [
    HeaderComponent,
    NavBarComponent,
    SearchComponent,
    SideNavComponent,
    SecNavBarComponent,
    InfoBarComponent
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
