import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Payment } from 'src/app/models/payment.model';
import { orderLables } from 'src/app/util/app.labels';

@Component({
  selector: 'app-order-price',
  templateUrl: './order-price.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./order-price.component.scss']
})
export class OrderPriceComponent implements OnInit {
  labels = orderLables;
  @Input() payment: Payment

  constructor() { }

  ngOnInit(): void {
  }

}
