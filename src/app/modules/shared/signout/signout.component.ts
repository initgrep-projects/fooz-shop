import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ToastService } from '../toasts/toast.service';
import {AuthMessages} from '../../../helpers/constants';
import { User } from 'src/app/models/user';
import { SubSink } from 'subsink';


@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  authMessages = AuthMessages;
  labels = AuthMessages.authAnchorLabels;
  authUser:User;
  @Output ('afterSignOut') afterSignOut = new EventEmitter();

  constructor(
    public  authService: AuthService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.subs.sink =
    this.authService.userFromStore$.subscribe(user => {
      this.authUser = user;
    });
  }

  async logOut() {
    await this.authService.logOut();
    this.afterSignOut.emit();
    this.toastService.show(this.authMessages.logoutSuccess, { icon: 'sign-out-alt' });
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

}
