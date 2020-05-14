import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  cartItemSize = 0;
  private subs: Subscription[] = [];

  @ViewChild('cartContent') cartContentRef: ElementRef;

  constructor(
    private cartService:CartService
  ) { }

  ngOnInit(): void {
    this.getCart();
  }


  getCart() {
    this.subs[this.subs.length + 1] =
      this.cartService.getCartFromStore()
        .subscribe(state => {
          this.cartItemSize = state.cart.length;
        });
  }

  ngOnDestroy(){
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
