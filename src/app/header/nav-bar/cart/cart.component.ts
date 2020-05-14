import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShopService } from 'src/app/modules/shop/shop.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: Product[] = [];
  private subs: Subscription[] = [];

  @ViewChild('cartContent') cartContentRef: ElementRef;

  constructor(
    private shopService: ShopService,
    private modalService: NgbModal
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
          if (this.cart.length > 0) {
            // this.showCartModal();
          }
        });
  }


  // showCartModal() {
  //   this.modalService.open(this.cartContentRef, { size: 'lg', scrollable: true });
  // }

}
