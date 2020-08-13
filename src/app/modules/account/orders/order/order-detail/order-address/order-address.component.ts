import { Component, OnInit, Input } from '@angular/core';
import { Address } from 'src/app/models/address';

@Component({
  selector: 'app-order-address',
  templateUrl: './order-address.component.html',
  styleUrls: ['./order-address.component.scss']
})
export class OrderAddressComponent implements OnInit {
  @Input() address: Address;

  constructor() { }

  ngOnInit(): void {
  }

}
