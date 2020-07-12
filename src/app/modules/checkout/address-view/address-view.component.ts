import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddressService } from '../../account/addresses/address.service';
import { Address } from 'src/app/models/address';
import { SubSink } from 'subsink';
import { AuthMessages } from 'src/app/util/app.labels';
import { fadeIn, staggerFadeIn } from 'src/app/animations/fadeAnimation';

@Component({
  selector: 'app-address-view',
  templateUrl: './address-view.component.html',
  styleUrls: ['./address-view.component.scss'],
  animations: [
    staggerFadeIn
  ]
})
export class AddressViewComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  labels = AuthMessages;
  selectedAddress: Address;
  constructor(public addService: AddressService) { }

  ngOnInit(): void {
    this.subs.sink = 
    this.addService.selectedAddress$.subscribe(ad => {
      console.log('selected address= ',ad);
      this.selectedAddress = ad;
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
