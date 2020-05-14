import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product';
import { HomeService } from '../home.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lookbook',
  templateUrl: './lookbook.component.html',
  styleUrls: ['./lookbook.component.scss']
})
export class LookbookComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  subs: Subscription[] = [];
  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.fetchLatestProducts();
  }

  fetchLatestProducts() {
    this.subs[this.subs.length + 1] =
      this.homeService.getHomePageStore()
        .subscribe(state => this.products = state.products.slice(0,5));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
