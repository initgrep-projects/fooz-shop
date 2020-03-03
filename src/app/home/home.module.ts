import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ItemCouroselComponent } from './item-courosel/item-courosel.component';
import { FeatureItemsComponent } from './feature-items/feature-items.component';
import { TrendComponent } from './trend/trend.component';
import { LookbookComponent } from './lookbook/lookbook.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
  faShoppingCart,
  faDotCircle,
  faTeethOpen,
  faDoorOpen,
  faLongArrowAltUp,
  faLongArrowAltDown,
  faArrowsAltH,
  faArrowsAltV
} from '@fortawesome/free-solid-svg-icons';
import { ItemModule } from '../item/item.module';

@NgModule({
  declarations: [
    HomeComponent,
    ItemCouroselComponent,
    FeatureItemsComponent,
    TrendComponent,
    LookbookComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule,
    FontAwesomeModule,
    ItemModule
  ],
  exports: [
  ]
})
export class HomeModule {


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
      faShoppingCart,
      faShoppingBag,
      faDotCircle,
      faDoorOpen,
      faLongArrowAltUp,
      faLongArrowAltDown,
      faArrowsAltH,
      faArrowsAltV
      );
  }

 }
