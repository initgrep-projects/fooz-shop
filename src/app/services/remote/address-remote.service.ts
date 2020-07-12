import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { ObjectTransformerService } from '../object-transformer.service';
import { ADDRESS_COLLECTION, SELECTED_ADDRESS_COLLECTION } from 'src/app/util/app.constants';
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
  private selectedAddressCollection: AngularFirestoreCollection<Address>;
  constructor(
    private db: AngularFirestore,
    private transformer: ObjectTransformerService,
  ) {
    this.addressCollection = this.db.collection<Address>(ADDRESS_COLLECTION);
    this.selectedAddressCollection = this.db.collection<Address>(SELECTED_ADDRESS_COLLECTION);
  }

  /** Address Operations start */
  saveAddress(address: Address): Observable<boolean> {
    return toObservable(this.addressCollection.doc(address.Id).set(classToPlain(address)));
  }

  updateAddress(address: Address): Observable<boolean> {
    return toObservable(this.addressCollection.doc(address.Id).update(classToPlain(address)));
  }

  deleteAddress(id: string): Observable<boolean> {
    return toObservable(this.addressCollection.doc(id).delete());
  }

  getAddresses(userId: string): Observable<Address[]> {
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

  saveSelectedAddress(address: Address): Observable<boolean> {
    return toObservable(this.selectedAddressCollection.doc(address.Id).set(classToPlain(address)));
  }

  deleteSelectedAddress(id: string):Observable<boolean>{
    return toObservable(this.selectedAddressCollection.doc(id).delete());
  }


  getSelectedAddress(userId: string): Observable<Address> {
    return this.db.collection(SELECTED_ADDRESS_COLLECTION, ref =>
      ref.where('userId', '==', userId)
    )
      .get()
      .pipe(
        map(querySnapShot => {
          const addresses: Address[] = [];
          querySnapShot.forEach(doc => {
            addresses.push(this.transformer.transformAddressFromDocumentData(doc.data()));
          });
          return addresses[0];
        })
      );
  }



  /** Address Operations End */
}
