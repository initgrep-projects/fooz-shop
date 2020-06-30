import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { shopRoutes } from 'src/app/config/app.routes';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(shopRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShopRoutingModule { }
