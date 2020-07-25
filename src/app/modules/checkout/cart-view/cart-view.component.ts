import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { CartItem } from 'src/app/models/cartItem';
import { cartLabels } from 'src/app/util/app.labels';
import { fadeIn, staggerFadeIn } from 'src/app/animations/fadeAnimation';
import { ProfileService } from '../../account/profile/profile.service';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss'],
  animations: [
    fadeIn,
    staggerFadeIn
  ]
})
export class CartViewComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  labels = cartLabels;
  constructor(
    public cartService: CartService,
    public profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  updateCartItem(item: CartItem) {
    this.subs.sink =
    this.cartService.updateCartItem(item).subscribe(
      ok => {
        if(ok){
          this.cartService.updateProductQuantity(item.Product, item.SelectedQuantity);
        }
      }
    );
  }

  updateProfile() {
    this.router.navigate(['/account/profile/edit']);
  }
  removeItem(id: string) {
    this.subs.sink =
      this.cartService.deleteItem(id).subscribe();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
