import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ToastService } from 'src/app/modules/shared/toasts/toast.service';
import { ItemDetailService } from '../item-detail.service';
import { CartService } from 'src/app/modules/cart/cart.service';

@Component({
  selector: 'app-item-buy',
  templateUrl: './item-buy.component.html',
  styleUrls: ['./item-buy.component.scss']
})
export class ItemBuyComponent implements OnInit {

  @Input() product: Product;

  isValidCart = true;

  constructor(private toastService: ToastService,
              private itemdetailService: ItemDetailService,
              private cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  addToCart() {

    this.isValidCart = this.itemdetailService.validateCartProduct();
    if (this.isValidCart) {

      this.toastService.show(
        'Item added to Card Successfully ',
        { classname: 'bg-dark text-light', delay: 1000 }
      );
      
      console.log('added to cart ', this.itemdetailService.getProduct());
      this.cartService.addProductTocart(this.itemdetailService.getProduct());
    }
  }

  getInvalidState() {
    return this.itemdetailService.invalidState;
  }
  

}
