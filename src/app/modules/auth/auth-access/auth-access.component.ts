import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { AuthModalService } from '../auth-modal/auth-modal.service';
import { confirmedUser } from './auth-confirm/auth-confirm.component';
import { Location } from '@angular/common';
import { RouteManagementService } from '../../main/route-management.service';

@Component({
  selector: 'app-auth-access',
  templateUrl: './auth-access.component.html',
  styleUrls: ['./auth-access.component.scss']
})
export class AuthAccessComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  confirmedUser: confirmedUser = { email: '', isExisting: false, isOpFinished: false };

  constructor(
    public mds: AuthModalService
  ) { }


  ngOnInit(): void { }

  onUserConfirmation(value: confirmedUser) {
    this.confirmedUser = value;
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
