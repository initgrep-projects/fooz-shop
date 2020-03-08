import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './modules/home/home.module';
import { ShopModule } from './modules/shop/shop.module';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule} from '@ngrx/store';


import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { TopBarComponent } from './header/top-bar/top-bar.component';
import { NavBarComponent } from './header/nav-bar/nav-bar.component';
import { SearchComponent } from './header/nav-bar/search/search.component';
import { AccountComponent } from './header/nav-bar/account/account.component';
import { CartComponent } from './header/nav-bar/cart/cart.component';

import { FooterComponent } from './footer/footer.component';

import { IconService } from './icons/icon.service';
import { AppReducer } from './store/app.reducer';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TopBarComponent,
    NavBarComponent,
    SearchComponent,
    AccountComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    HomeModule,
    ShopModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    StoreModule.forRoot(AppReducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconLiberary: FaIconLibrary, iconService: IconService) {
    iconLiberary.addIcons(...iconService.getImportedIcons());
  }
}
