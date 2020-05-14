import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';



@NgModule({
  declarations: [
    CartComponent,
    CartItemsComponent,
    CartModalComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    CartRoutingModule
  ],
  exports: [
    CartComponent
  ]
})
export class CartModule { }
