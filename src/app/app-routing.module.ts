import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { ItemDetailComponent } from './shop/items/item-detail/item-detail.component';


const routes: Routes = [

  {path : 'home', component: HomeComponent},
  {path: 'shop' , component: ShopComponent},
  {path: 'item/details', component: ItemDetailComponent},
  {path : '', redirectTo: '/home', pathMatch: 'full'},
  // {path : '/', redirectTo: '/home', pathMatch: 'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
