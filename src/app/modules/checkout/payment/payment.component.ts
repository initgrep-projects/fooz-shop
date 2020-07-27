import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { cartLabels } from 'src/app/util/app.labels';
import { AddressService } from '../../account/addresses/address.service';
import { ProfileService } from '../../account/profile/profile.service';
import { AuthService } from '../../auth/auth.service';
import { CartService } from '../../cart/cart.service';
import { BraintreeService } from '../braintree.service';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewInit {
  labels = cartLabels;
  private submitButton: QueryList<ElementRef<any>>;
  private dropInInstance:any;

  @ViewChildren('submitButton') 
  set _submitButton(c: QueryList<ElementRef<any>>) {
  
    if (!isEmpty(c) && c?.first) {
      console.log('set method called for dropincontainer',c.first.nativeElement);
      this.submitButton = c;
     this.braintreeService.initializeUI(this.submitButton.first);
      
    }
  }
  constructor(
    public authService: AuthService,
    public profileService: ProfileService,
    public cartService: CartService,
    public addressService: AddressService,
    private router: Router,
    private braintreeService:BraintreeService
  ) { }

  ngAfterViewInit(): void {
    // console.log('local submit bitton', this.submitButton.nativeElement);


  }



  updateProfile() {
    this.router.navigate(['/account/profile/edit']);
  }
  ngOnInit(): void {
    // console.log('local submit bitton on init', this.submitButton);

  }



}
