import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { checkoutRoutes } from 'src/app/config/app.routes';



@NgModule({
  declarations: [],
  imports: [
  RouterModule.forChild(checkoutRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CheckoutRoutingModule { }
