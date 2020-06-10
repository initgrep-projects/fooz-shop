import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { SubSink } from 'subsink';
import { User } from 'src/app/models/user';
import { AuthService } from '../auth.service';
import { AuthMessages } from '../../../helpers/constants';
import { ToastService } from '../../shared/toasts/toast.service';

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
      });

  }

  async logOut(){
    await this.authService.logOut();
    this.toastService.show(this.authMessages.logoutSuccess,{icon:'sign-out-alt'});
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
