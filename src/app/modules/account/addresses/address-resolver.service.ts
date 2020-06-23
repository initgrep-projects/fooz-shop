import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';

import { Address } from 'src/app/models/address';
import { AddressService } from './address.service';

@Injectable({
  providedIn: 'root'
})
export class AddressResolver implements Resolve<Address>{

  constructor(private addressService: AddressService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Address | Observable<Address> | Promise<Address> {

    const id = route.paramMap.get('id');
    return this.addressService.getAddressById(id);

  }
}
