import { Component, OnInit, Input } from '@angular/core';
import { Payment } from 'src/app/models/payment.model';

@Component({
  selector: 'app-order-price',
  templateUrl: './order-price.component.html',
  styleUrls: ['./order-price.component.scss']
})
export class OrderPriceComponent implements OnInit {
  @Input() payment: Payment

  constructor() { }

  ngOnInit(): void {
  }

}
