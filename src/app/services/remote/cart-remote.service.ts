import { Injectable } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { Observable, of, merge, forkJoin, from, defer } from 'rxjs';
import { classToPlain } from 'class-transformer';
import { CART_COLLECTION } from 'src/app/util/app.constants';
import { toObservable } from 'src/app/util/app.lib';
import { ObjectTransformerService } from '../object-transformer.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs/operators';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class CartRemoteService {

  private cartCollection: AngularFirestoreCollection<CartItem>;

  constructor(
    private db: AngularFirestore,
    private transformer: ObjectTransformerService,
  ) {
    this.cartCollection = this.db.collection<CartItem>(CART_COLLECTION);
  }


  /** cart Operations START */
  saveCartItemToDb(item: CartItem): Observable<boolean> {
    return defer(async () => {
      await this.cartCollection.doc(item.Id).set(classToPlain(item));
      return true;
    });
  }

  updateCartItem(item: CartItem): Observable<boolean> {
    console.log('update cartItem')
    return defer(async () => {
      await this.cartCollection.doc(item.Id).set(classToPlain(item));
      return true;
    });

  }

  updateCart(items: CartItem[]): Observable<boolean> {
    return forkJoin(items.map(item => this.updateCartItem(item)))
      .pipe(
        map(all => all.reduce((ac, ele) => ac && ele))
      );
  }

  deleteCartItem(id: string): Observable<boolean> {
    return defer(async () => {
      await this.cartCollection.doc(id).delete();
      return true;
    });
  }

  fetchCart(userId: string) {
    return this.db.collection(CART_COLLECTION, ref =>
      ref.where('userId', '==', userId)
    )
      .get()
      .pipe(
        map(qs => {
          const items: CartItem[] = [];
          if (!qs.empty) {
            qs.forEach(doc => {
              items.push(this.transformer.transformcartItem(doc.data()));
            });
          }
          return items;
        })
      );
  }




}
