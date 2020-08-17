import { Component, OnDestroy, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/animations/fadeAnimation';
import { AuthService } from '../../auth/auth.service';
import { AddressService } from '../addresses/address.service';
import { SubSink } from 'subsink';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  animations: [
    fadeIn
  ]
})
export class OverviewComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }



  ngOnInit(): void {
  }


}
