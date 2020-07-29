import { Component, OnDestroy, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { CartItem } from 'src/app/models/cart-item';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { CartService } from 'src/app/modules/cart/cart.service';
import { generateGuid } from 'src/app/util/app.lib';
import { SubSink } from 'subsink';
import { ItemDetailService } from '../item-detail.service';

@Component({
  selector: 'app-item-buy',
  templateUrl: './item-buy.component.html',
  styleUrls: ['./item-buy.component.scss']
})
export class ItemBuyComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  cartItem: CartItem;
  isValidCart = true;
  authUser:User;

  constructor(
    private itemdetailService: ItemDetailService,
    private cartService: CartService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.cartItem = new CartItem();
    this.authService.userFromStore$.subscribe(user=> {
      console.log('Auth User in itemBuy= ', user);
      this.authUser = user;
      this.cartItem.UserId = user?.UID;
      this.cartItem.IsAnonymousUser = user?.IsAnonymous;
    });

   
    this.subs.sink = this.itemdetailService.inputProductChange
      .subscribe(p => {
        this.cartItem.Product = cloneDeep(p);
      });

    this.subs.sink = this.itemdetailService.categoryChange
      .subscribe(c => this.cartItem.SelectedCategory = c);
    this.subs.sink = this.itemdetailService.colorChange
      .subscribe(c => this.cartItem.SelectedColor = c);
    this.subs.sink = this.itemdetailService.quantityChange
      .subscribe(q => this.cartItem.SelectedQuantity = q);
    this.subs.sink = this.itemdetailService.sizeChange
      .subscribe(s => this.cartItem.SelectedSize = s);
    this.subs.sink = this.itemdetailService.customSizeChange
      .subscribe(cz => this.cartItem.SelectedCustomSize = cz);

  }

  addToCart() {
    console.log('addToCart Called  ', this.cartItem);
    this.cartItem.Id = generateGuid();
    this.cartItem.CreatedDate = Date.now();
    const item = cloneDeep(this.cartItem);
    this.isValidCart = this.itemdetailService.validateCartItem(item);
    console.log('isValid = ', this.isValidCart);
    if (this.isValidCart) {
      this.subs.sink = this.cartService.addItem(item).subscribe();
    }
  }


  getInvalidState() {
    return this.itemdetailService.invalidState;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


}
