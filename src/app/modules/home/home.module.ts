import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { TrendComponent } from './trend/trend.component';
import { LookbookComponent } from './lookbook/lookbook.component';
import {  NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import {  FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    HomeComponent,
    TrendComponent,
    LookbookComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbCarouselModule,
    FontAwesomeModule,
    SharedModule

  ],
  exports: [

  ]
})
export class HomeModule {


 }
