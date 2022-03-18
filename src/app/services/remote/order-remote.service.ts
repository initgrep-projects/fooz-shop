import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { classToPlain } from 'class-transformer';
import { isEmpty } from 'lodash';
import { combineLatest, defer, Observable, of, zip } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { CartItemStage } from 'src/app/models/cart-item';
import { OrderStatus } from 'src/app/models/order-status.model';
import { Order, OrderItem } from 'src/app/models/order.modal';
import { Payment } from 'src/app/models/payment.model';
import { CART_COLLECTION, ORDER_ITEM_COLLECTION, ORDER_STATUS_COLLECTION, PAYMENT_COLLECTION } from 'src/app/util/app.constants';
import { ObjectTransformerService } from '../object-transformer.service';
import { AddressRemoteService } from './address-remote.service';
import { CartRemoteService } from './cart-remote.service';

@Injectable({
  providedIn: 'root'
})
export class OrderRemoteService {
  private lastOrderItem: OrderItem;
  private pageSize = 2;

  private orderItemCollection: AngularFirestoreCollection<OrderItem>;
  private orderStatusCollection: AngularFirestoreCollection<OrderStatus>;
  private paymentCollection: AngularFirestoreCollection<Payment>;

  constructor(
    private db: AngularFirestore,
    private transformer: ObjectTransformerService,
    private cartRemoteService: CartRemoteService,
    private addressremoteService: AddressRemoteService
  ) {
    this.orderItemCollection = this.db.collection<OrderItem>(ORDER_ITEM_COLLECTION);
    this.orderStatusCollection = this.db.collection<OrderStatus>(ORDER_STATUS_COLLECTION);
    this.paymentCollection = this.db.collection<Payment>(PAYMENT_COLLECTION);
  }


  saveOrder(order: Order) {
    console.log("saveOrder ", order);
    return defer(async () => {
      const batch = this.db.firestore.batch();

      const orderItemRef = this.db.firestore.collection(ORDER_ITEM_COLLECTION).doc(order.OrderItem.Id);
      batch.set(orderItemRef, classToPlain(order.OrderItem));

      const paymentRef = this.db.firestore.collection(PAYMENT_COLLECTION).doc(order.Payment.Id);
      batch.set(paymentRef, classToPlain(order.Payment));

      /** initialy only one status would be there */
      const statusRef = this.db.firestore.collection(ORDER_STATUS_COLLECTION).doc(order.StatusList[0].Id);
      batch.set(statusRef, classToPlain(order.StatusList[0]));

      order.OrderItem.CartItemIds.forEach(cartId => {
        const ref = this.db.firestore.collection(CART_COLLECTION).doc(cartId)
        batch.update(ref, { stage: CartItemStage.ORDER });
      });

      await batch.commit();
      return true;
    });
  }

  saveOrderStatus(status: OrderStatus) {
    return defer(async () => {
      await this.orderStatusCollection.doc(status.Id).set(status);
      return true;
    });
  }

  private fetchOrderItem(userId: String) {
    console.log('fetchOrderItem called ', userId);
    return this.db.collection(ORDER_ITEM_COLLECTION, ref =>
      ref
        .where('userId', '==', userId)
        .orderBy('createdOn', 'desc')
        .limit(this.pageSize)
    ).get();
  }

  private fetchPaginatedOrderItem(userId: String) {
    console.log('fetchPaginatedOrderItem called ', userId);
    return this.db.collection(ORDER_ITEM_COLLECTION, ref =>
      ref
        .where('userId', '==', userId)
        .orderBy('createdOn', 'desc')
        .startAfter(this.lastOrderItem.CreatedDate)
        .limit(this.pageSize)
    ).get();
  }

  fetchOrders(userId: string, paginate: boolean = false) {
    let orderItems$ = paginate ? this.fetchPaginatedOrderItem(userId) : this.fetchOrderItem(userId);
    return orderItems$
      .pipe(
        take(1),
        map(qs => {
          const orders: Order[] = [];
          if (!qs.empty) {
            qs.forEach(doc => {
              const order = new Order();
              order.OrderItem = this.transformer.transformOrderItem(doc.data());
              orders.push(order);
            });
          }
          this.lastOrderItem = !isEmpty(orders) ? orders[orders.length - 1].OrderItem : null;
          return orders;
        }),
        switchMap(orders => {
          if (!isEmpty(orders)) {
            const orderCarts = combineLatest(orders.map(order => this.cartRemoteService.fetchCartByIds(userId, order.OrderItem.CartItemIds)));
            const orderPayments = combineLatest(orders.map(order => this.fetchPaymentByOrderId(order.OrderItem.Id)));
            const orderStatusList = combineLatest(orders.map(order => this.fetchOrderStatusByOrderId(order.OrderItem.Id)));
            const orderAdddresses = combineLatest(orders.map(order => this.addressremoteService.fetchAddressForUserById(order.OrderItem.AddressId, userId)));
            return zip(of(orders), orderCarts, orderPayments, orderAdddresses, orderStatusList);

          }
            return zip(of([]), of([]), of([]), of([]), of([]));
        }),
        map(([orders, orderCarts, orderPayments, orderAddresses, orderStatusList]) => {
          // console.log('order in map => ', orders, orderCarts, orderPayments, orderAddresses, orderStatusList);
          orders.forEach((order, index) => {
            order.Cart = orderCarts[index];
            order.Payment = orderPayments[index];
            order.Address = orderAddresses[index];
            order.StatusList = orderStatusList[index];
          });

          return orders;
        }),
        // tap(orders => console.log('orders fetched', orders)),
        take(1)
      );
  }

  fetchOrderByOrderId(userId: string, orderId: string) {
    console.log('fetchOrderByOrderId called ', userId, orderId);
    return this.db.collection(ORDER_ITEM_COLLECTION, ref =>
      ref
        .where('userId', '==', userId)
        .where('id', '==', orderId)
    )
      .get()
      .pipe(
        map(qs => {
          let orderItem: OrderItem;
          qs.forEach(doc => {
            orderItem = this.transformer.transformOrderItem(doc.data())
          });
          return new Order(orderItem);
        }),
        switchMap(order => {
          console.log('order', order);
          const cart = this.cartRemoteService.fetchCartByIds(userId, order.OrderItem.CartItemIds);
          const payment = this.fetchPaymentByOrderId(order.OrderItem.Id);
          const statusList = this.fetchOrderStatusByOrderId(order.OrderItem.Id);
          const address = this.addressremoteService.fetchAddressForUserById(order.OrderItem.AddressId, userId);
          return zip(of(order), cart, payment, address, statusList);
        }),
        take(1),
        map(([order, cart, payment, address, statusList]) => {
          // console.log('afterSwitchMap ', [order, cart, payment, statusList]);
          order.Cart = cart;
          order.Payment = payment;
          order.StatusList = statusList;
          order.Address = address;
          return order;
        }),
        // tap(order => console.log('selectedOrder fetched ', order))
      );
  }


  fetchPaymentByOrderId(orderId: string): Observable<Payment> {
    return this.db.collection(PAYMENT_COLLECTION, ref =>
      ref.where('orderId', '==', orderId)
    )
      .get()
      .pipe(
        map(querySnapShot => {
          let payment: Payment;
          querySnapShot.forEach(doc => {
            payment = this.transformer.transformPayment(doc.data());
          });
          return payment;
        }),
        take(1)
      );
  }

  fetchOrderStatusByOrderId(orderId: string) {
    return this.db.collection(ORDER_STATUS_COLLECTION, ref =>
      ref.where('orderId', '==', orderId)
        .orderBy('createdOn', 'asc')
    )
      .get()
      .pipe(
        map(qs => {
          let status: OrderStatus[] = [];
          qs.forEach(doc => {
            status.push(this.transformer.transformOrderStatus(doc.data()));
          })
          return status;
        }),
        take(1)
      );
  }



}
