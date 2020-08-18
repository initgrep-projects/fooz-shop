import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from './alert/alert.component';
import { AnchorsComponent } from './anchors/anchors.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CardItemComponent } from './card-item/card-item.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ColorComponent } from './color/color.component';
import { DialogComponent } from './dialog/dialog.component';
import { ClearInputDirective } from './directives/clear-input.directive';
import { HeaderScrollDirective } from './directives/header-scroll.directive';
import { MatfocusDirective } from './directives/matfocus.directive';
import { FeatureItemsComponent } from './feature-items/feature-items.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { ItemComponent } from './item/item.component';
import { LookbookItemComponent } from './lookbook-item/lookbook-item.component';
import { ParallaxComponent } from './parallax/parallax.component';
import { PreCardComponent } from './pre-card/pre-card.component';
import { PreTileCardComponent } from './pre-tile-card/pre-tile-card.component';
import { QuantityComponent } from './quantity/quantity.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SignoutComponent } from './signout/signout.component';
import { SizeComponent } from './size/size.component';
import { StatusComponent } from './status/status.component';
import { ToastsComponent } from './toasts/toasts.component';
import { UserAddressComponent } from './user-address/user-address.component';
import { UserCardComponent } from './user-card/user-card.component';
import { HammerModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    ItemComponent,
    PreCardComponent,
    ToastsComponent,
    SidebarComponent,
    ParallaxComponent,
    LookbookItemComponent,
    SizeComponent,
    ColorComponent,
    QuantityComponent,
    DialogComponent,
    UserCardComponent,
    AnchorsComponent,
    SignoutComponent,
    FeatureItemsComponent,
    BreadcrumbComponent,
    CartItemComponent,
    PreTileCardComponent,
    MatfocusDirective,
    ClearInputDirective,
    CardItemComponent,
    StatusComponent,
    UserAddressComponent,
    AlertComponent,
    HeaderScrollDirective,
    ImageSliderComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    NgbToastModule,
    HammerModule
  ],
  exports: [
    ItemComponent,
    PreCardComponent,
    PreTileCardComponent,
    ToastsComponent,
    SidebarComponent,
    ParallaxComponent,
    FeatureItemsComponent,
    LookbookItemComponent,
    SizeComponent,
    ColorComponent,
    QuantityComponent,
    UserCardComponent,
    AnchorsComponent,
    SignoutComponent,
    BreadcrumbComponent,
    CartItemComponent,
    MatfocusDirective,
    ClearInputDirective,
    HeaderScrollDirective,
    CardItemComponent,
    StatusComponent,
    UserAddressComponent,
    AlertComponent,
    ImageSliderComponent,
    HammerModule
  ]
})
export class SharedModule { }
