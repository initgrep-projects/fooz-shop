import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { fadeIn } from 'src/app/animations/fadeAnimation';
import { Address } from 'src/app/models/address';
import { AuthMessages } from 'src/app/util/app.labels';
import { AddressService } from './address.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
  animations: [
    fadeIn
  ]
})
export class AddressesComponent implements OnInit {
  private subs = new SubSink();
  labels = AuthMessages;
  addresses: Address[];

  constructor(
    public addressService: AddressService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void { }

  routeToNewAddress() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  deleteAddress(add: Address) {
    this.addressService.removeAddress(add.Id).subscribe();
  }
  editAddress(add: Address) {
    this.addressService.addSelectedAddress(add);
  }
}
