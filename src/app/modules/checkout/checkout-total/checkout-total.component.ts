import { Component, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/animations/fadeAnimation';

@Component({
  selector: 'app-checkout-total',
  templateUrl: './checkout-total.component.html',
  styleUrls: ['./checkout-total.component.scss'],
  animations: [
    fadeIn
  ]
})
export class CheckoutTotalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
