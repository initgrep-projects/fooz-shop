import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CartService } from '../../cart/cart.service';
import { AddressService } from '../../account/addresses/address.service';
import { ProfileService } from '../../account/profile/profile.service';
import { cartLabels } from 'src/app/util/app.labels';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  labels = cartLabels;

  constructor(
    public authService: AuthService,
    public profileService: ProfileService,
    public cartService: CartService,
    public addressService: AddressService,
    private router: Router
  ) { }

  updateProfile() {
    this.router.navigate(['/account/profile/edit']);
  }
  ngOnInit(): void {
  }

}
