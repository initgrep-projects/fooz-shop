import { Component, OnInit } from '@angular/core';
import { cartLabels } from 'src/app/util/app.labels';
import { AddressService } from '../../account/addresses/address.service';
import { AuthService } from '../../auth/auth.service';
import { CartService } from '../../cart/cart.service';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  labels = cartLabels;

  constructor(
    private authService: AuthService,
    private addressService: AddressService,
    private cartService: CartService
  ) { }

  ngOnInit(): void { }

  payNow() {
    // const cartIds$ = this.cartService.cart$.pipe(map(cart => cart.map(item => item.Id)));
    // combineLatest(this.authService.userFromStore$, cartIds$, this.addressService.selectedAddress$)
    //   .pipe(
    //     switchMap(([user, cartIds, selectedAddress]) => { 

    //     })
    // )
  }



}
