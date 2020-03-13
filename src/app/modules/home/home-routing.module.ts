import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ItemDetailComponent } from '../shop/items/item-detail/item-detail.component';
import { ProductResolver } from 'src/app/services/product-resolver.service';


const homeRoutes: Routes  = [
  {path : 'home', component: HomeComponent},
  {path: 'home/item/:id', component: ItemDetailComponent , resolve: {product: ProductResolver}}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
