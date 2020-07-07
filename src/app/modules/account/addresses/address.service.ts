import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { isEmpty } from 'lodash';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Address } from 'src/app/models/address';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';
import { AppState } from '../../main/store/app.reducer';
import { addAddressAction, deleteAddressAction, updateAddressAction, loadAddressesAction, loadCountriesAction } from '../store/account.actions';
import { ToastService, toastType } from '../../shared/toasts/toast.service';
import { AuthMessages } from 'src/app/util/app.labels';
@Injectable({
  providedIn: 'root'
})
export class AddressService {
  labels = AuthMessages;
  addresses$ = this.store.select('account').pipe(map(state => state.addresses));
  countries$ = this.store.select('account').pipe(map(state => state.countries));

  constructor(
    private db: FireStoreDbService,
    private toastService: ToastService,
    private store: Store<AppState>
  ) {
    this.store.dispatch(loadAddressesAction());
    this.store.dispatch(loadCountriesAction());
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

  removeAddress(id: string) {
    this.db.deleteAddress(id)
      .then(() => {
        console.log('addresses removal called');
        // this.store.dispatch(deleteAddressAction({ payload: id }));
        // this.toastService.show(this.labels.addressRemoveSuccess);
      }).catch(error => this.toastService.show(this.labels.addressRemoveFailed, { type: toastType.ERROR }));
  }

}



