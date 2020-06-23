import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { isEmpty } from 'lodash';
import { Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Address } from 'src/app/models/address';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';
import { AuthService } from '../../auth/auth.service';
import { AppState } from '../../main/store/app.reducer';
import { addAddressAction, deleteAddressAction, syncAddressesAction, updateAddressAction } from '../store/account.actions';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private db: FireStoreDbService,
    private store: Store<AppState>,
    private authService: AuthService
  ) {

  }


  saveAddress(address: Address): Promise<void> {
    return new Promise((resolve, reject) => {

      this.db.saveAddress(address)
        .then(() => {
          this.store.dispatch(addAddressAction({ payload: address }));
          resolve();
        })
        .catch(error => reject(error));
    });
  }

  updateAddress(address: Address): Promise<void> {
    return new Promise((resolve, reject) => {

      this.db.updateAddress(address)
        .then(() => {
          this.store.dispatch(updateAddressAction({ payload: address }));
          resolve();
        })
        .catch(error => reject(error));
    });
  }


  getAddresses(): Observable<Address[]> {
    return this.store.select('account')
      .pipe(map(state => state.addresses));
  }

  getAddressById(id: string): Observable<Address> {
    return this.getAddresses()
      .pipe(
        take(1),
        map(addresses => addresses.filter(ad => ad.Id === id)),
        map(adds => {
          if (!isEmpty(adds)) {
            return adds.pop();
          }
          return null;
        })
      )
  }

  removeAddress(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.deleteAddress(id)
        .then(() => {
          this.store.dispatch(deleteAddressAction({ payload: id }));
          resolve();
        }).catch(error => reject(error));
    });
  }

  syncAddressesFromDB$ =
    this.authService.userFromStore$
      .pipe(
        switchMap(user => {
          if (!!user) {
            return this.db.getAddresses(user.UID);
          } else {
            const emptyAddress: Address[] = [];
            return of(emptyAddress);
          }

        }),
        tap(addresses => this.store.dispatch(syncAddressesAction({ payload: addresses })))
      );

}



