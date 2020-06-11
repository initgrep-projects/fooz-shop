import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { SubSink } from 'subsink';
import { User } from 'src/app/models/user';
import { AuthService } from '../auth.service';
import { AuthMessages } from '../../../helpers/constants';
import { ToastService } from '../../shared/toasts/toast.service';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-auth-anchor',
  templateUrl: './auth-anchor.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./auth-anchor.component.scss']
})
export class AuthAnchorComponent implements OnInit, OnDestroy {
  authMessages = AuthMessages;
  labels = AuthMessages.authAnchorLabels;

  private subs = new SubSink();
  authUser: User;

  @ViewChild(NgbPopover) popover: NgbPopover;

  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.subs.sink =
      this.authService.userFromStore$.subscribe(user => {
        console.log('auth user   = ', user);
        window['authuser'] = user;
        this.authUser = user;
        this.closePopover();
      });

  }

  sendEmailVerification() {
    this.authService.verifyEmail()
      .then(() => {
        this.toastService.show(this.authMessages.emailVerification, { icon: 'envelope-open-text' });

      }).catch(() => {
        this.toastService.show(this.authMessages.emailVerificationFailed, { icon: 'envelope-open-text', classname: "bg-danger text-white" });

      })
      .finally(() => this.closePopover());

  }

  async logOut() {
    await this.authService.logOut();
    this.toastService.show(this.authMessages.logoutSuccess, { icon: 'sign-out-alt' });
  }

  closePopover() {
    if (!!this.popover) {
      this.popover.close();
    }
  }

  openPopover() {
    this.popover.open();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
