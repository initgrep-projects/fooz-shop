import { Injectable } from '@angular/core';
import { Currency } from 'src/app/models/currency';
import { OrderStatus } from 'src/app/models/order-status.model';
import { OrderItem, Order } from 'src/app/models/order.modal';
import { Payment, PaymentType } from 'src/app/models/payment.model';
import { generateGuid } from 'src/app/util/app.lib';
import { ShippingService } from '../../checkout/shipping.service';
import { TaxService } from '../../checkout/tax.service';
import { CartService } from '../../cart/cart.service';
import { combineLatest, zip, of, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { initialState } from '../../home/store/home.reducer';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private cartService: CartService,
    private shippingService: ShippingService,
    private taxService: TaxService
  ) { }


  createOrder(userId: string, cartIds: string[], addressId: string, amount: number, paymentType: PaymentType) {
    const order = new OrderItem(generateGuid(), userId, cartIds, addressId);
    const status = OrderStatus.confirmed(order.Id);
    const payment = Payment.create(paymentType, order.Id, Currency.QAR(amount));
    return new Order(order, payment, status);
  }

  /** reduce right error here */
  orderCharges$: Observable<{ itemPrice: number, tax: number, shipping: number }> =
    this.cartService.cart$
      .pipe(
        switchMap(cart => {
          const initialAmount = cart
            ?.map(item => item.Product.Price.Amount * item.SelectedQuantity)
            ?.reduce((price = 0, itemPrice) => price + itemPrice);
          return combineLatest(of(initialAmount), this.taxService.tax(initialAmount), this.shippingService.shipping(initialAmount))
        }
        ),
        map(([amount, tax, shipping]) => {
          return { itemPrice: amount, tax: tax, shipping: shipping }
        })
      );


  orderSize$ = this.cartService.cartSize$;




}
