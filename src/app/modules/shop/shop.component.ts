import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShopService } from './shop.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {

  subs: Subscription[] = [];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.dispatchProductsToShopStore();
  }

  dispatchProductsToShopStore() {
    this.subs[this.subs.length + 1] =
      this.shopService.dispatchProductsToStore().subscribe();
  }
  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
