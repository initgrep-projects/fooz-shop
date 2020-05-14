import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartModalComponent } from './cart-modal/cart-modal.component';

const routes:Routes = [
  {
    path: 'cart',
    component: CartModalComponent,
    outlet: 'md'
  },
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class CartRoutingModule { }
