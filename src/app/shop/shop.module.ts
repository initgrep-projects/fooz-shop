import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ItemsComponent } from './items/items.component';
import { FilterHeaderComponent } from './filter-header/filter-header.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { CustomSizeComponent } from './items/item-detail/customize/custom-size/custom-size.component';
import { ItemCustomizeComponent } from './items/item-detail/customize/item-customize.component';
import { ItemImagesComponent } from './items/item-detail/item-images/item-images.component';
import { ItemInfoComponent } from './items/item-detail/item-info/item-info.component';
import { ItemSizeComponent } from './items/item-detail/item-size/item-size.component';
import { ItemBuyComponent } from './items/item-detail/item-buy/item-buy.component';
import { ItemBuyGuideComponent } from './items/item-detail/item-buy-guide/item-buy-guide.component';
import { SizeFilterComponent } from './filter-header/size-filter/size-filter.component';
import { SortFilterComponent } from './filter-header/sort-filter/sort-filter.component';
import { CategoryFilterComponent } from './filter-header/category-filter/category-filter.component';
import { MainFilterComponent } from './filter-header/main-filter/main-filter.component';
import { ShopRoutingModule } from './shop-routing.module';
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
    ShopComponent,
    ItemsComponent,
    FilterHeaderComponent,
    ItemDetailComponent,
    CustomSizeComponent,
    ItemCustomizeComponent,
    ItemImagesComponent,
    ItemInfoComponent,
    ItemSizeComponent,
    ItemBuyComponent,
    ItemBuyGuideComponent,
    SizeFilterComponent,
    SortFilterComponent,
    CategoryFilterComponent,
    MainFilterComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    NgbModule,
    FontAwesomeModule,
    ItemModule
  ],
  exports: []
})
export class ShopModule {

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
