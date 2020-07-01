import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { TrendComponent } from './trend/trend.component';
import { LookbookComponent } from './lookbook/lookbook.component';
import {  NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import {  FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from './store/home.effects';

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
    SharedModule,
    EffectsModule.forFeature([HomeEffects])

  ],
  exports: [

  ]
})
export class HomeModule {


 }
