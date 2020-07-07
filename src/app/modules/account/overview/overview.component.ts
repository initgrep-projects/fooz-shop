import { Component, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/animations/fadeAnimation';
import { AddressService } from '../addresses/address.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  animations:[
    fadeIn
  ]
})
export class OverviewComponent implements OnInit {

  constructor(
    public addressService: AddressService
  ) { }

  ngOnInit(): void {
  }

}
