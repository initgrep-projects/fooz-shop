import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { isEmpty } from 'lodash';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { Address } from 'src/app/models/address';
import { AddressRemoteService } from 'src/app/services/remote/address-remote.service';
import { AuthMessages } from 'src/app/util/app.labels';
import { AppState } from '../../main/store/app.reducer';
import { AlertService } from '../../shared/alert/alert.service';
import { ToastService } from '../../shared/toasts/toast.service';
import { addAddressAction, deleteAddressAction, loadAddressesAction, loadCountriesAction, updateAddressAction } from '../store/account.actions';
@Injectable({
  providedIn: 'root'
})
export class AddressService {
  labels = AuthMessages;
  addresses$ = this.store.select('account').pipe(map(state => state.addresses));
  countries$ = this.store.select('account').pipe(map(state => state.countries));

  constructor(
    private db: AddressRemoteService,
    private toastService: ToastService,
    private alertService: AlertService,
    private store: Store<AppState>
  ) {
    this.store.dispatch(loadAddressesAction());
    this.store.dispatch(loadCountriesAction());
  }



  saveAddress(address: Address){
      return this.db.saveAddress(address)
      .pipe(
        tap(isOK => {
          if(isOK){
            this.store.dispatch(addAddressAction({ payload: address }));
            this.toastService.success(this.labels.addressAddSuccess);
          }
        }),
        catchError(error => {
          this.toastService.failure(this.labels.addressAddFailed);
          return of(error);
        }));
  }

  updateAddress(address: Address) {
    return this.db.updateAddress(address)
      .pipe(
        tap(isOK => {
          console.log("isOk = ", isOK);
          if (isOK) {
            this.store.dispatch(updateAddressAction({ payload: address }));
            this.toastService.success(this.labels.addressUpdateSuccess);
          }
        }),
        catchError(error => {
          this.toastService.failure(this.labels.addressUpdateFailed);
          return of(error);
        }));
  }


  removeAddress(id: string) {
    return this.alertService.confirmRemoval()
      .pipe(
        switchMap(isOK => isOK ? this.db.deleteAddress(id) : of(false)),
        tap((isOK) => {
          if (isOK) {
            this.store.dispatch(deleteAddressAction({ payload: id }));
            this.toastService.show(this.labels.addressRemoveSuccess);
          }
        }),
        catchError(error => {
          this.toastService.failure(this.labels.addressRemoveFailed);
          return of(error);
        }));
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
        }));
  }


}



