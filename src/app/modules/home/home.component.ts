import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { ProductService } from '../shop/product.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(public homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.latestProducts$.subscribe(ps => console.log("ps = ", ps));
  }
  

}
