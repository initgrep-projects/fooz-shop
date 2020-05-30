import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ToastService } from 'src/app/modules/shared/toasts/toast.service';
import { ItemDetailService } from '../item-detail.service';
import { CartService } from 'src/app/modules/cart/cart.service';
import { SubSink } from 'subsink';
import { cloneDeep } from 'lodash';
import { CartItem } from 'src/app/models/cartItem';
import { generateGuid } from 'src/app/helpers/util';

@Component({
  selector: 'app-item-buy',
  templateUrl: './item-buy.component.html',
  styleUrls: ['./item-buy.component.scss']
})
export class ItemBuyComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  /**
   * to be done later when Authentication is implemented
   */
  userId = 'Ano';
  cartItem: CartItem;
  isValidCart = true;


  constructor(
    private toastService: ToastService,
    private itemdetailService: ItemDetailService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartItem = new CartItem();
    this.cartItem.UserId = this.userId;
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
    this.cartItem.Id = generateGuid(); 
    this.cartItem.CreatedDate = Date.now();
    
    const item = cloneDeep(this.cartItem);
    this.isValidCart = this.itemdetailService.validateCartItem(item);
    if (this.isValidCart) {
      this.toastService.show(
        'Item added to Card Successfully ',
        { classname: 'bg-dark text-light', delay: 1000 }
      );

      this.cartService.addItem(item);
    }
  }


  getInvalidState() {
    return this.itemdetailService.invalidState;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


}
