import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ItemCouroselComponent } from './home/item-courosel/item-courosel.component';
import { FeatureItemsComponent } from './home/feature-items/feature-items.component';
import { TrendComponent } from './home/trend/trend.component';
import { LookbookComponent } from './home/lookbook/lookbook.component';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ShopComponent } from './shop/shop.component';
import {ItemsComponent} from './shop/items/items.component';
import { HomeComponent } from './home/home.component';


import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAtom,
  faBolt,
  faShoppingBag,
  faPhoneAlt,
  faSearch,
  faUserCircle,
  faCircleNotch,
  faBookmark,
  faHeart,
  faStar,
  faArrowCircleDown,
  faArrowAltCircleDown,
  faBoxOpen,
  faMapMarkerAlt,
  faFilter,
  faSort,
  faLevelDownAlt,
  faTape,
  faLayerGroup,
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons';
import { FilterHeaderComponent } from './shop/filter-header/filter-header.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ItemCouroselComponent,
    FeatureItemsComponent,
    TrendComponent,
    LookbookComponent,
    ShopComponent,
    ItemsComponent,
    HomeComponent,
    FilterHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(iconLiberary: FaIconLibrary) {
    iconLiberary.addIcons(
      faAtom,
      faBolt,
      faShoppingBag,
      faPhoneAlt,
      faSearch,
      faUserCircle,
      faBookmark,
      faHeart,
      faStar,
      faArrowCircleDown,
      faArrowAltCircleDown,
      faBookmark,
      faBoxOpen,
      faMapMarkerAlt,
      faFilter,
      faSort,
      faTape,
      faLayerGroup,
      faShoppingCart
      );
  }

}
