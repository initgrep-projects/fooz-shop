import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item/item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PreCardComponent } from './pre-card/pre-card.component';
import { NgbToastModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsComponent } from './toasts/toasts.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ParallaxComponent } from './parallax/parallax.component';
import { LookbookItemComponent } from './lookbook-item/lookbook-item.component';
import { RouterModule } from '@angular/router';
import { SizeComponent } from './size/size.component';
import { ColorComponent } from './color/color.component';
import { QuantityComponent } from './quantity/quantity.component';
import { AlertComponent } from './alert/alert.component';

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
    AlertComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    NgbToastModule,
  ],
  exports: [
    ItemComponent,
    PreCardComponent,
    ToastsComponent,
    SidebarComponent,
    ParallaxComponent,
    LookbookItemComponent,
    SizeComponent,
    ColorComponent,
    QuantityComponent
  ]
})
export class SharedModule { }
