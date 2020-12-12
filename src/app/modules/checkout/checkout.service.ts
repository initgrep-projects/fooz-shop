import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Currency } from 'src/app/models/currency';
import { OrderStatus } from 'src/app/models/order-status.model';
import { Order, OrderItem, OrderSplitCharges } from 'src/app/models/order.modal';
import { Payment, PaymentType } from 'src/app/models/payment.model';
import { generateGuid } from 'src/app/util/app.lib';
import { AddressService } from '../account/addresses/address.service';
import { OrderService } from '../account/orders/order.service';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../cart/cart.service';
import { CouponService } from './checkout-total/coupon-list/coupon.service';
import { ShippingService } from './shipping.service';
import { TaxService } from './tax.service';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private addressService: AddressService,
    private shippingService: ShippingService,
    private taxService: TaxService,
    private couponService: CouponService,
    private orderService: OrderService
  ) { }

  /**
   * 
   * takes the items from the cart,
   * takes the current user, selected Address, and orderCharges @see orderCharges
   * saves all the information 
   * 
   * if the order is successfull,
   * clear the cart and clear the selected coupon
   * @param paymentType  PaymentType
   */
  createOrder(paymentType: PaymentType) {
    const cartIds$ = this.cartService.cart$.pipe(map(cart => cart.map(item => item.Id)));
    return combineLatest([this.authService.userFromStore$, cartIds$, this.addressService.checkedAddress$, this.orderCharges$])
      .pipe(
        switchMap(([user, cartIds, selectedAddress, orderCharges]) => {
          const order = new OrderItem(generateGuid(), user.UID, cartIds, selectedAddress.Id);
          const status = OrderStatus.confirm(order.Id);
          const payment = Payment.create(paymentType, order.Id, orderCharges.itemPrice, orderCharges.shipping, orderCharges.tax, orderCharges.coupon);
          return of(new Order(order, payment, [status]));
        }),
        take(1),
        tap(order => console.log('createOrder => ', order)),
        switchMap(order => this.orderService.saveOrder(order)),
        tap(ok => {
          if (ok) {
            this.cartService.loadAllCartItems();
            this.couponService.addSelectedCoupon(null);
          }
        }),
        take(1)
      );
  }

  /**
   * calculate the charges based on the cart amount.
   * calculat tax based on tax percentage
   * calculate shipping based on shipping percentage
   * calculate coupon final value based on coupon type
   */
  orderCharges$: Observable<OrderSplitCharges> =
    this.cartService.cart$
      .pipe(
        switchMap(cart => {

          const itemTotalPrice = Currency.QAR(cart
            ?.map(item => item.Product.Price.Amount * item.SelectedQuantity)
            ?.reduce((price = 0, itemPrice) => price + itemPrice, 0));

          return combineLatest(of(itemTotalPrice), this.taxService.tax(itemTotalPrice),
            this.shippingService.shipping(itemTotalPrice), this.couponService.couponFinalValue(itemTotalPrice.Amount))
        }
        ),
        map(([amount, tax, shipping, coupon]) => {
          return <OrderSplitCharges>{
            itemPrice: amount,
            tax: tax,
            shipping: shipping,
            coupon: coupon
          }

        })
      );


  orderSize$ = this.cartService.cartSize$;






}
