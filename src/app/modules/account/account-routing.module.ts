import { NgModule } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { accountRoutes } from 'src/app/config/app.routes';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(accountRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AccountRoutingModule { }
