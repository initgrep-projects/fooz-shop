import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterRoutingModule } from './footer-routing.module';
import { FooterComponent } from './footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterMainComponent } from './footer-main/footer-main.component';
import { FooterSecComponent } from './footer-sec/footer-sec.component';



@NgModule({
  declarations: [
    FooterComponent,
    FooterMainComponent,
    FooterSecComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FooterRoutingModule
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
