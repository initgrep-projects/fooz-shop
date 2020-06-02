import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthModalComponent } from './auth-modal/auth-modal.component';

const routes:Routes = [
  {
    path:'auth',
    component: AuthModalComponent,
    outlet: 'secure'
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AuthRoutingModule { }
