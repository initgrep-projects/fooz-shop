import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/animations/fadeAnimation';
import { Address } from 'src/app/models/address';
import { AuthMessages } from 'src/app/util/app.labels';
import { SubSink } from 'subsink';
import { AddressService } from '../../account/addresses/address.service';
import { ProfileService } from '../../account/profile/profile.service';
import { RouteManagementService } from '../../main/route-management.service';

@Component({
  selector: 'app-address-view',
  templateUrl: './address-view.component.html',
  styleUrls: ['./address-view.component.scss'],
  animations: [
    fadeIn
  ]
})
export class AddressViewComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  labels = AuthMessages;

  constructor(
    public addService: AddressService,
    public profileService: ProfileService,
    @Inject(DOCUMENT) private document: Document,
    public rms: RouteManagementService
  ) { }

  ngOnInit(): void {
  }

  updateAddressSelection(address: Address) {
    this.subs.sink = this.addService.updateSelection(address)
      .subscribe(
        () => {
          this.document.body.scrollIntoView({
            block: 'start',
            behavior: 'smooth'
          })
        }
      );
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }



}
