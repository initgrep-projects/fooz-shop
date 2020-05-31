import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';
import { ProductService } from '../../shop/product.service';

@Component({
  selector: 'app-lookbook',
  templateUrl: './lookbook.component.html',
  styleUrls: ['./lookbook.component.scss']
})
export class LookbookComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  subs: Subscription[] = [];
  isLoading = true;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.fetchLatestProducts();
  }

  fetchLatestProducts() {
    this.subs[this.subs.length + 1] =
      this.productService.getShopFromStore()
        .subscribe(state => this.products = state.products.slice(0, 5));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
