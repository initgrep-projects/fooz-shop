import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartModalComponent } from './header/nav-bar/cart/cart-modal/cart-modal.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'cart',
    component: CartModalComponent,
    outlet: 'modal'
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
