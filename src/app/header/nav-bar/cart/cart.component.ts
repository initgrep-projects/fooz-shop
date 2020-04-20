import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/modules/shop/shop.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

   cart: Product[] = [];
  private subs: Subscription[] = [];

  constructor(
    private shopService: ShopService
  ) { }

  ngOnInit(): void {
    this.getCart();
  }


  getCart() {
    this.subs[this.subs.length + 1] =
      this.shopService.getShopFromStore()
        .subscribe(state => {
          this.cart = state.cart;
          console.log('items in cart =  ', this.cart);
        });
  }

}
