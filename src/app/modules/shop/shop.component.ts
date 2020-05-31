import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }
}
