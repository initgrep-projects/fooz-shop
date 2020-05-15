import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ToastService } from 'src/app/modules/shared/toasts/toast.service';
import { ItemDetailService } from '../item-detail.service';
import { CartService } from 'src/app/modules/cart/cart.service';
import { SubSink } from 'subsink';
import {cloneDeep} from 'lodash';
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

  product: Product ;
  selectedQuantity = 1;
  isValidCart = true;


  constructor(
    private toastService: ToastService,
    private itemdetailService: ItemDetailService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    console.log("itemBuy init");

    this.subs.sink = this.itemdetailService.onProductRecieved
                        .subscribe(p  => {
                          console.log('product recieved subscription ', p);
                          this.product = cloneDeep(p);
                        });

    this.subs.sink = this.itemdetailService.onCategoryChange
                        .subscribe(c => this.product.Category = c);
    this.subs.sink = this.itemdetailService.onColorChange
                        .subscribe(c => this.product.Colors = [c]);
    this.subs.sink = this.itemdetailService.onQuantityChange
                        .subscribe(q => this.selectedQuantity = q);
    this.subs.sink = this.itemdetailService.onSizeChange                                                             
                        .subscribe(s => this.product.Sizes = [s]);
    this.subs.sink = this.itemdetailService.onCustomSizeChange
                        .subscribe(cz => this.product.CustomSize = cz);  

  }

  addToCart() {
    console.log("addToCart = ", this.product);
    this.isValidCart = this.itemdetailService.validateCartProduct(this.product, this.selectedQuantity);
    // if (this.isValidCart) {

    //   this.toastService.show(
    //     'Item added to Card Successfully ',
    //     { classname: 'bg-dark text-light', delay: 1000 }
    //   );

    //   this.cartService.addItem(this.product, this.selectedQuantity, this.userId);
    // }
  }


  getInvalidState() {
    return this.itemdetailService.invalidState;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


}
