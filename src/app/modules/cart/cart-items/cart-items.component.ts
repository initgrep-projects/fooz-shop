import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem } from 'src/app/models/cartItem';
import { CartModalService } from '../cart-modal/cart-modal.service';
import { SubSink } from 'subsink';
import { Router, ActivatedRoute } from '@angular/router';
import { cartLabels } from 'src/app/util/app.labels';
import { staggerFadeIn } from 'src/app/animations/fadeAnimation';


@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss'],
  animations:[
    staggerFadeIn
  ]
})
export class CartItemsComponent implements OnInit, OnDestroy {
  labels = cartLabels;
  cart: CartItem[];
  private subs = new SubSink();

  constructor(
    private cartService: CartService,
    private cartModalService: CartModalService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCart();
  }

  /**
   * get the cart items from the store
   */
  getCart() {
    console.log('cart fetched from cart-items');
    this.subs.sink =
      this.cartService.cart$
        .subscribe(cart => {
          this.cart = [...cart];
        });
  }

  closeModal() {
    this.cartModalService.dismissModal();
  }

  routeToItemDetails(id: string) {
    this.closeModal();
    setTimeout(() => {
      this.router.navigate(
        ['shop/item', id],
      );
    }, 100);
  }

  updateCartItem(item: CartItem) {
    this.cartService.updateCartItem(item);
    this.cartService.updateProductQuantity(item.Product, item.SelectedQuantity);
  }

  removeItem(id: string) {
    this.cartService.deleteItem(id);
  }

  routeToShop() {
    this.closeModal();
    setTimeout(() => {
      this.router.navigate(['shop'], { relativeTo: this.activatedRoute });
    }, 100);
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
