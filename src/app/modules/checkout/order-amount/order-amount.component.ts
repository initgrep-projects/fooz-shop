import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { SubSink } from 'subsink';
import { map, tap } from 'rxjs/operators';
import { isEmpty } from 'lodash';
import { faQuran } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order-amount',
  templateUrl: './order-amount.component.html',
  styleUrls: ['./order-amount.component.scss']
})
export class OrderAmountComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  totalPrice = 0;
  grossAmount = 0;
  itemQuantity = 0;
  deliveryFee = 0;
  currencyCode = 'QR';
  taxRate = 0.2;
  totalTax = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.calculateGrossAmount();
  }

  calculateGrossAmount() {
    this.subs.sink =
      this.cartService.cart$

        .subscribe(cart => {
          if (!isEmpty(cart)) {
            this.currencyCode = cart[0].Product.Price.Code;
            this.itemQuantity = cart.length;
            this.totalPrice = cart
              .map(item => item.Product.Price.Amount * item.SelectedQuantity)
              .reduce((price, itemPrice) => price + itemPrice);

            this.grossAmount = this.totalPrice + this.deliveryFee;
            this.totalTax = (this.grossAmount*this.taxRate)/100;
            this.grossAmount += this.totalTax;

          }

        });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
