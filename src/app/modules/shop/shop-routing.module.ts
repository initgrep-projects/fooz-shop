import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { ProductResolver } from 'src/app/services/product-resolver.service';


const routes: Routes = [
  {path: 'shop' , component: ShopComponent},
  {path: 'shop/item/:id', component: ItemDetailComponent, resolve: {product: ProductResolver}},

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports : [
    RouterModule
  ]
})
export class ShopRoutingModule { }
