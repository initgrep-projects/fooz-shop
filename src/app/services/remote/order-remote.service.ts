import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { defer, Observable } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';
import { OrderStatus } from 'src/app/models/order-status.model';
import { Order, OrderItem } from 'src/app/models/order.modal';
import { Payment } from 'src/app/models/payment.model';
import { ORDER_ITEM_COLLECTION, ORDER_STATUS_COLLECTION, PAYMENT_COLLECTION, CART_COLLECTION } from 'src/app/util/app.constants';
import { ObjectTransformerService } from '../object-transformer.service';
import { classToPlain } from 'class-transformer';
import { CartItemStage } from 'src/app/models/cart-item';
import { ItemsComponent } from 'src/app/modules/shop/items/items.component';

@Injectable({
  providedIn: 'root'
})
export class OrderRemoteService {

  private orderItemCollection: AngularFirestoreCollection<OrderItem>;
  private orderStatusCollection: AngularFirestoreCollection<OrderStatus>;
  private paymentCollection: AngularFirestoreCollection<Payment>;

  constructor(
    private db: AngularFirestore,
    private transformer: ObjectTransformerService,
  ) {
    this.orderItemCollection = this.db.collection<OrderItem>(ORDER_ITEM_COLLECTION);
    this.orderStatusCollection = this.db.collection<OrderStatus>(ORDER_STATUS_COLLECTION);
    this.paymentCollection = this.db.collection<Payment>(PAYMENT_COLLECTION);
  }


  saveOrder(order: Order) {
    return defer(async () => {
      const batch = this.db.firestore.batch();

      const orderItemRef = this.db.firestore.collection(ORDER_ITEM_COLLECTION).doc(order.OrderItem.Id);
      batch.set(orderItemRef, classToPlain(order.OrderItem));

      const paymentRef = this.db.firestore.collection(PAYMENT_COLLECTION).doc(order.Payment.Id);
      batch.set(paymentRef, classToPlain(order.Payment));

      const statusRef = this.db.firestore.collection(ORDER_STATUS_COLLECTION).doc(order.Status.Id);
      batch.set(statusRef, classToPlain(order.Status));

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
      await this.orderStatusCollection.doc(status.Id).set(classToPlain(status));
      return true;
    });
  }

  fetchOrders(userId: string) {
    return this.db.collection(ORDER_ITEM_COLLECTION, ref =>
      ref
        .where('userId', '==', userId)
    ).get()
      .pipe(
        map(qs => {
          const orders: OrderItem[] = [];
          if (!qs.empty) {
            qs.forEach(doc => {
              orders.push(this.transformer.transformOrderItem(doc.data()));
            });
          }
          return orders;
        })
      );
  }

  // fetchOrderItem(userId: string) {
  //   return this.db.collection(CART_COLLECTION, ref =>
  //     ref
  //       .where('userId', '==', userId)
  //       .where('stage', '==', 'CART')
  //   )
  //     .get()
  //     .pipe(
  //       map(qs => {
  //         const items: CartItem[] = [];
  //         if (!qs.empty) {
  //           qs.forEach(doc => {
  //             items.push(this.transformer.transformcartItem(doc.data()));
  //           });
  //         }
  //         return items;
  //       })
  //     );
  // }
}
