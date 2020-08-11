import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Observable, Subject } from 'rxjs';

import { Address } from 'src/app/models/address';
import { AddressService } from './address.service';
import { tap, take, switchMap, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddressResolver implements Resolve<Address>{

  private emitted = new Subject<boolean>();

  constructor(private addressService: AddressService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Address | Observable<Address> | Promise<Address> {

    const id = route.paramMap.get('id');
    // return this.addressService.getAddressById(id);
    return this.addressService.selectedAddress$
      .pipe(
        take(1),
        tap(address => {
          if (!address) {
            this.addressService.loadSelectedAddress(id);
          }
        })
      )

  }
}
