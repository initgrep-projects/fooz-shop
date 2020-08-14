import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AddressService } from './address.service';


@Injectable({
  providedIn: 'root'
})
export class AddressResolver implements Resolve<boolean>{

  private emitted = new Subject<boolean>();

  constructor(private addressService: AddressService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : boolean | Observable<boolean> | Promise<boolean> {

    const id = route.paramMap.get('id');
    return this.addressService.isSelectedAddressInLocalStore(id)
      .pipe(
        tap(isPresent => {
          if (!isPresent) {
            this.addressService.loadSelectedAddress(id);
          }
        }),
        take(1)
      );
  }
}
