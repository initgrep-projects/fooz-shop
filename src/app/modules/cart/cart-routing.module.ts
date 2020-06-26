import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {cartRoutes} from 'src/app/config/app.routes';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(cartRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class CartRoutingModule { }
