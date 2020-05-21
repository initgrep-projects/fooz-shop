import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem } from 'src/app/models/cartItem';
import { CartModalService } from '../cart-modal/cart-modal.service';
import { SubSink } from 'subsink';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent implements OnInit, OnDestroy {

  cart: CartItem[] = [];
  private subs = new SubSink();

  constructor(
    private cartService: CartService,
    private cartModalService: CartModalService,
    private router: Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCart();
  }

  /**
   * get the cart items from the store
   */
  getCart() {
    this.subs.sink =
      this.cartService.getCartFromStore()
        .subscribe(state => {
          this.cart = state.cart;
          console.log('cart from store = ', this.cart);
        });
  }

  closeModal() {
    this.cartModalService.dismissModal();
  }

  routeToShop(){
    this.closeModal();
    setTimeout(()=>{
      this.router.navigate(['shop'],{relativeTo: this.activatedRoute});
    },1000);
    
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
