import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { cartLabels } from 'src/app/util/app.labels';
import { RouteManagementService } from '../main/route-management.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  labels = cartLabels
  constructor(
    public cartService: CartService,
    public rmgt: RouteManagementService
  ) { }

  ngOnInit(): void {
  }

}
