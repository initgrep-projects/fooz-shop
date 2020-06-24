import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { isEmpty } from 'lodash';
import { Observable, of, BehaviorSubject, Subject, throwError } from 'rxjs';
import { map, switchMap, take, tap, startWith, catchError } from 'rxjs/operators';
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
  ) {}

  addresses$ = this.store.select('account').pipe(map(state => state.addresses));


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




  getAddressById(id: string): Observable<Address> {
    return this.addresses$
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
          } 
          return of(null);

        }),
        tap(addresses => this.store.dispatch(syncAddressesAction({ payload: addresses })))
      );

}



