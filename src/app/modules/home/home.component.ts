import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { ProductService } from '../shop/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }
  ngOnDestroy() {
  }

}
