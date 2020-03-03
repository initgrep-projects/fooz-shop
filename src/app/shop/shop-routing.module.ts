import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';


const routes: Routes = [

  {path: 'shop' , component: ShopComponent},
  {path: 'item/details', component: ItemDetailComponent},


];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ShopRoutingModule { }
