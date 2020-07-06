import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeIn } from 'src/app/animations/fadeAnimation';
import { Address } from 'src/app/models/address';
import { AuthMessages } from 'src/app/util/app.labels';
import { AddressService } from './address.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
  animations: [
    fadeIn
  ]
})
export class AddressesComponent implements OnInit {
  labels = AuthMessages;
  addresses: Address[];

  constructor(
    public addressService: AddressService,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  routeToNewAddress() {
    this.router.navigate(['my/account/address/new']);
  }

  deleteAddress(add:Address){
    this.addressService.removeAddress(add.Id);
  }

}
