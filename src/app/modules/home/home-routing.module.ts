import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { homeRoutes } from 'src/app/config/app.routes';




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
