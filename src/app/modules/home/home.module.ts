import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { ItemCouroselComponent } from './item-courosel/item-courosel.component';
import { FeatureItemsComponent } from './feature-items/feature-items.component';
import { TrendComponent } from './trend/trend.component';
import { LookbookComponent } from './lookbook/lookbook.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {  FontAwesomeModule } from '@fortawesome/angular-fontawesome';



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
    SharedModule

  ],
  exports: [
  ]
})
export class HomeModule {


  // constructor(iconLiberary: FaIconLibrary) {
  //   iconLiberary.addIcons(
      
  //     );
  // }

 }
