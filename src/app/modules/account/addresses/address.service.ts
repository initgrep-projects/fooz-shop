import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { clone } from 'lodash';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { Address } from 'src/app/models/address';
import { AddressRemoteService } from 'src/app/services/remote/address-remote.service';
import { AuthMessages } from 'src/app/util/app.labels';
import { AppState } from '../../main/store/app.reducer';
import { DialogService } from '../../shared/dialog/dialog.service';
import { ToastService } from '../../shared/toasts/toast.service';
import { addAddressAction, deleteAddressAction, loadAddressesAction, loadCountriesAction, updateAddressAction, loadSelectedAddressAction, addSelectedAddressAction } from '../store/account.actions';
@Injectable({
  providedIn: 'root'
})
export class AddressService {
  labels = AuthMessages;

  addresses$ = this.store.select('account').pipe(map(state => state.addresses));
  checkedAddress$ = this.addresses$.pipe(map(ads => !ads ? null : ads.find(ad => ad.IsSelected)));
  selectedAddress$ = this.store.select('account').pipe(map(state => state.selectedAddress));
  countries$ = this.store.select('account').pipe(map(state => state.countries));

  constructor(
    private db: AddressRemoteService,
    private toastService: ToastService,
    private dialog: DialogService,
    private store: Store<AppState>
  ) {

    this.loadAddresses();
    this.loadCountries();
    this.loadSelectedAddress('2D4E2388-F9D9-E114-4FF6-CFE896A5C04F');
  }

  loadAddresses() {
    this.store.dispatch(loadAddressesAction());
  }

  loadSelectedAddress(id: string) {
    this.store.dispatch(loadSelectedAddressAction({ addressId: id }))
  }

  loadCountries() {
    this.store.dispatch(loadCountriesAction());
  }

  addSelectedAddress(address: Address) {
    this.store.dispatch(addSelectedAddressAction({ payload: address }));
  }

  saveAddress(address: Address) {
    return this.db.saveAddress(address)
      .pipe(
        tap(isOK => {
          if (isOK) {
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
    return this.dialog.confirmRemoval()
      .pipe(
        switchMap(isOK => isOK ? this.db.deleteAddress(id) : of(false)),
        tap((isOK) => {
          if (isOK) {
            this.store.dispatch(deleteAddressAction({ payload: id }));
            this.toastService.success(this.labels.addressRemoveSuccess);
          }
        }),
        catchError(error => {
          this.toastService.failure(this.labels.addressRemoveFailed);
          return of(error);
        }));
  }




  updateSelection(param: Address) {
    return this.addresses$.pipe(
      take(1),
      map(addresses => this.toggleSelections(addresses, param)),
      switchMap(updatedList => {
        return this.db.updateAddressSelection(updatedList);
      }),
      tap(ok => {
        if (ok) {
          this.store.dispatch(loadAddressesAction());
        }
      }),

      catchError(err => of(err))
    );
  }

  private toggleSelections(allAddress: Address[], selected: Address) {
    return allAddress.map(ad => {
      const a = clone(ad);
      a.IsSelected = ad.equals(selected) ? true : false;
      return a;
    });
  }

}



