import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { ObjectTransformerService } from '../object-transformer.service';
import { ADDRESS_COLLECTION } from 'src/app/util/app.constants';
import { Observable } from 'rxjs';
import { classToPlain } from 'class-transformer';
import { toObservable } from 'src/app/util/app.lib';
import { map } from 'rxjs/operators';
import { Address } from 'src/app/models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressRemoteService {
  private addressCollection: AngularFirestoreCollection<Address>;
  constructor(
    private db: AngularFirestore,
    private transformer: ObjectTransformerService,
  ) {
    this.addressCollection = this.db.collection<Address>(ADDRESS_COLLECTION);
  }

  /** Address Operations start */
  saveAddress(address: Address): Observable<boolean> {
    return toObservable(this.addressCollection.doc(address.Id).set(classToPlain(address)));
  }

  updateAddress(address: Address): Observable<boolean> {
    return toObservable(this.addressCollection.doc(address.Id).update(classToPlain(address)));
  }

  updateAddressSelection(addresses: Address[]): Observable<boolean> {
    const batch = this.db.firestore.batch();
    addresses.forEach(ad => {
      const docRef = this.db.firestore.collection(ADDRESS_COLLECTION).doc(ad.Id);
      batch.set(docRef, classToPlain(ad));
    });
    return toObservable(batch.commit());
  }

  deleteAddress(id: string): Observable<boolean> {
    return toObservable(this.addressCollection.doc(id).delete());
  }

  fetchAddresses(userId: string): Observable<Address[]> {
    return this.db.collection(ADDRESS_COLLECTION, ref =>
      ref.where('userId', '==', userId)
    )
      .get()
      .pipe(
        map(querySnapShot => {
          const addresses: Address[] = [];
          querySnapShot.forEach(doc => {
            addresses.push(this.transformer.transformAddressFromDocumentData(doc.data()));
          });
          return addresses;
        })
      );
  }

  fetchAddressById(id: string) {
    return this.db.collection(ADDRESS_COLLECTION, ref =>
      ref.where('id', '==', id)
    )
      .get()
      .pipe(
        map(qs => {
          let address: Address;
          qs.forEach(doc => {
            address = this.transformer.transformAddressFromDocumentData(doc.data());
          });
          return address;
        })
      )
  }




  /** Address Operations End */
}
