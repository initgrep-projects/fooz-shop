import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/models/cartItem';
import { cartLabels } from 'src/app/util/app.labels';
import { SubSink } from 'subsink';
import { CartModalService } from '../cart-modal/cart-modal.service';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  labels = cartLabels;
  cart: CartItem[] = null;

  constructor(
    public cartService: CartService,
    private cartModalService: CartModalService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.cartService.cart$.subscribe(cart => this.cart = cart);
  }

  updateCartItem(item: CartItem) {
    
    this.subs.sink =
      this.cartService.updateCartItem(item).subscribe(
        ok => this.cartService.updateProductQuantity(item.Product, item.SelectedQuantity)
      );

  }

  removeItem(id: string) {
    this.subs.sink = this.cartService.deleteItem(id).subscribe();
  }

  routeToItemDetails(id: string) {
    this.closeModal();
    setTimeout(() => {
      this.router.navigate(
        ['shop/item', id],
      );
    }, 100);
  }

  routeToShop() {
    this.closeModal();
    setTimeout(() => {
      this.router.navigate(['shop'], { relativeTo: this.activatedRoute });
    }, 100);
  }

  routeToCheckout() {
    this.closeModal();
    setTimeout(() => {
      this.router.navigate(['/checkout/cart']);
    }, 100);
  }

  closeModal() {
    this.cartModalService.dismissModal();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


}
