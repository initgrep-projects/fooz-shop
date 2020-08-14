import { Component, OnInit, Input } from '@angular/core';
import { Address } from 'src/app/models/address';
import { orderLables } from 'src/app/util/app.labels';

@Component({
  selector: 'app-order-address',
  templateUrl: './order-address.component.html',
  styleUrls: ['./order-address.component.scss']
})
export class OrderAddressComponent implements OnInit {
  labels = orderLables;
  @Input() address: Address;

  constructor() { }

  ngOnInit(): void {
  }

}
