import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ItemDetailComponent } from '../shop/items/item-detail/item-detail.component';


const homeRoutes: Routes  = [
  {path : 'home', component: HomeComponent},
  {path: 'home/item/:id', component: ItemDetailComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(homeRoutes)
  ]
})
export class HomeRoutingModule { }
