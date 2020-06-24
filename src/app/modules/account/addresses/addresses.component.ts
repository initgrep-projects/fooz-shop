import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddressService } from './address.service';
import { SubSink } from 'subsink';
import { Address } from 'src/app/models/address';
import { tap, startWith, take } from 'rxjs/operators';
import { AuthMessages } from 'src/app/util/app.labels';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit, OnDestroy {
  labels = AuthMessages;
  private subs = new SubSink();
  addresses: Address[];
  isloading = true;
  isEmpty = false;
  isError = false;

  constructor(
    public addressService: AddressService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.subs.sink =
      this.addressService.syncAddressesFromDB$.subscribe();
  }

  routeToNewAddress() {
    this.router.navigate(['my/account/address/new']);
  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }



}
