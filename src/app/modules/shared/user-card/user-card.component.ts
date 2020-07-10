import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';

import { AuthService } from '../../auth/auth.service';
import { ToastService, toastType } from '../toasts/toast.service';
import { SubSink } from 'subsink';
import { AuthMessages } from 'src/app/util/app.labels';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  authUser: User;
  authMessages = AuthMessages;
  labels = AuthMessages.authAnchorLabels;
  @Output() userLoaded = new EventEmitter();
  @Output() manageProfile = new EventEmitter();


  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subs.sink =
      this.authService.userFromStore$.subscribe(user => {
        this.authUser = user;
        /**TODO: have to find the right place to emit it */
        // this.userLoaded.emit();
      });
  }

  sendEmailVerification() {
    this.authService.verifyEmail()
      .then(() => {
        this.toastService.success(this.authMessages.emailVerification,  'envelope-open-text' );

      }).catch(() => {
        this.toastService.failure(this.authMessages.emailVerificationFailed,'envelope-open-text');
      });
  }

  routeToAccount() {
    this.manageProfile.emit();
    this.router.navigate(['my/account']);

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
