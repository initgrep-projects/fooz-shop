import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CartService } from '../../cart/cart.service';
import { AddressService } from '../../account/addresses/address.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(
    public authService:AuthService,
    public cartService: CartService,
    public addressService:AddressService
  ) { }

  ngOnInit(): void {
  }

}
