import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ShopComponent } from './shop.component';
import { ItemsComponent } from './items/items.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { CustomSizeComponent } from './items/item-detail/customize/custom-size/custom-size.component';
import { ItemCustomizeComponent } from './items/item-detail/customize/item-customize.component';
import { ItemImagesComponent } from './items/item-detail/item-images/item-images.component';
import { ItemInfoComponent } from './items/item-detail/item-info/item-info.component';
import { ItemSizeComponent } from './items/item-detail/item-size/item-size.component';
import { ItemBuyComponent } from './items/item-detail/item-buy/item-buy.component';
import { ItemBuyGuideComponent } from './items/item-detail/item-buy-guide/item-buy-guide.component';
import { ShopRoutingModule } from './shop-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FilterByCategoryPipe } from 'src/app/pipes/filter-by-category.pipe';
import { FilterBySizePipe } from 'src/app/pipes/filter-by-size.pipe';
import { SortPipe } from 'src/app/pipes/sort.pipe';
import { ItemColorComponent } from './items/item-detail/item-color/item-color.component';
import { ItemCategoryComponent } from './items/item-detail/item-category/item-category.component';
import { ItemQuantityComponent } from './items/item-detail/item-quantity/item-quantity.component';
import { FilterHeaderComponent } from './filters/filter-header/filter-header.component';
import { SizeFilterComponent } from './filters/filter-header/size-filter/size-filter.component';
import { SortFilterComponent } from './filters/filter-header/sort-filter/sort-filter.component';
import { CategoryFilterComponent } from './filters/filter-header/category-filter/category-filter.component';
import { MainFilterComponent } from './filters/filter-header/main-filter/main-filter.component';
import { SideFilterBarComponent } from './filters/side-filter-bar/side-filter-bar.component';
import { SideFilterComponent } from './filters/side-filter-bar/side-filter/side-filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




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
    ItemColorComponent,
    ItemBuyComponent,
    ItemBuyGuideComponent,
    ItemCategoryComponent,
    ItemQuantityComponent,
    SizeFilterComponent,
    SortFilterComponent,
    CategoryFilterComponent,
    MainFilterComponent,
    FilterByCategoryPipe,
    FilterBySizePipe,
    SortPipe,
    SideFilterBarComponent,
    SideFilterComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    NgbModule,
    FontAwesomeModule,
    SharedModule
  ],
  exports: []
})
export class ShopModule {


}
