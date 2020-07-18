import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { staggerFadeIn } from 'src/app/animations/fadeAnimation';
import { Address } from 'src/app/models/address';
import { AuthMessages } from 'src/app/util/app.labels';
import { SubSink } from 'subsink';
import { AddressService } from '../../account/addresses/address.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AlertConfig, AlertType } from '../../shared/alert/alert.component';
import { ProfileService } from '../../account/profile/profile.service';

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

  constructor(
    public addService: AddressService,
    public profileService: ProfileService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
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

  routeToPayment() {
    this.router.navigate(['/checkout/payment']);
  }

  updateProfile(){
    this.router.navigate(['/account/profile/edit']);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }



}
