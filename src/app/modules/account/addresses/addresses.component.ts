import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddressService } from './address.service';
import { SubSink } from 'subsink';
import { Address } from 'src/app/models/address';
import { AuthMessages } from 'src/app/util/app.labels';
import { Router } from '@angular/router';
import { staggerFadeIn, fadeIn } from 'src/app/animations/fadeAnimation';
import { staggerSlideIn, slideIn } from 'src/app/animations/slideAnimations';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
  animations:[
    staggerFadeIn,
    staggerSlideIn,
    fadeIn,
    slideIn
  ]
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
