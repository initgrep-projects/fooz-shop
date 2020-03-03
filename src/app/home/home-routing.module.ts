import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';


const homeRoutes: Routes  = [
  {path : 'home', component: HomeComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(homeRoutes)
  ]
})
export class HomeRoutingModule { }
