import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddressService } from './address.service';
import { SubSink } from 'subsink';
import { Address } from 'src/app/models/address';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  addresses: Address[] = [];

  constructor(
    private addressService: AddressService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.subs.sink = 
    this.addressService.syncAddressesFromDB$.subscribe();

    this.subs.sink = 
    this.addressService.getAddresses().subscribe(addresses => {
      this.addresses = addresses;
    });
  }

  ngOnDestroy():void{
    this.subs.unsubscribe();
  }

}
