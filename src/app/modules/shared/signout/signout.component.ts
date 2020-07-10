import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ToastService, toastType } from '../toasts/toast.service';

import { User } from 'src/app/models/user';
import { SubSink } from 'subsink';
import { AuthMessages } from 'src/app/util/app.labels';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  authMessages = AuthMessages;
  labels = AuthMessages.authAnchorLabels;
  authUser: User;
  @Output('afterSignOut') afterSignOut = new EventEmitter();

  constructor(
    public authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subs.sink =
      this.authService.userFromStore$.subscribe(user => {
        this.authUser = user;
      });
  }

  async logOut() {
    try {
      await this.authService.logOut();
      this.afterSignOut.emit();
      this.toastService.success(this.authMessages.logoutSuccess,'sign-out-alt' );
      this.router.navigate(['shop']);
    } catch (e) {
      this.toastService.failure(this.authMessages.logoutFail);
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
