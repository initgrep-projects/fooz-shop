import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from './store/cart.effects';



@NgModule({
  declarations: [
    CartComponent,
    CartItemsComponent,
    CartModalComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    CartRoutingModule,
    SharedModule,
    EffectsModule.forFeature([CartEffects])
  ],
  exports: [
    CartComponent
  ]
})
export class CartModule { }
