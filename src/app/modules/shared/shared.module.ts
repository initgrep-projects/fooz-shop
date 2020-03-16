import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item/item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PreCardComponent } from './pre-card/pre-card.component';



@NgModule({
  declarations: [
    ItemComponent,
    PreCardComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    ItemComponent,
    PreCardComponent
  ]
})
export class SharedModule { }
