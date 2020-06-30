import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { authRoutes } from 'src/app/config/app.routes';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class AuthRoutingModule { }
