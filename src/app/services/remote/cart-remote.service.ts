import { Injectable } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { Observable, of, merge, forkJoin } from 'rxjs';
import { classToPlain } from 'class-transformer';
import { CART_COLLECTION } from 'src/app/util/app.constants';
import { toObservable } from 'src/app/util/app.lib';
import { ObjectTransformerService } from '../object-transformer.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs/operators';

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
    return toObservable(this.cartCollection.doc(item.Id).set(classToPlain(item)));
  }
  
  updateCartItem(item: CartItem): Observable<boolean> {
    return toObservable(this.cartCollection.doc(item.Id).set(classToPlain(item)));

  }

  updateCart(items: CartItem[]): Observable<boolean> {
    return forkJoin(items.map(item => this.updateCartItem(item)))
    .pipe(
      map(all => all.reduce((ac,ele) => ac&& ele))
    )
  }

  deleteCartItem(id: string): Observable<boolean> {
    return toObservable(this.cartCollection.doc(id).delete());
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
