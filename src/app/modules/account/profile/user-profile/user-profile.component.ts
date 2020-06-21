import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { cloneDeep } from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService, toastType } from 'src/app/modules/shared/toasts/toast.service';
import { AuthMessages } from 'src/app/util/app.labels';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  labels = AuthMessages;
  private subs = new SubSink();
  authUser: User;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.subs.sink =
      this.authService.userFromStore$
        .subscribe((user: User) => {
          console.log("user change in user profile ", user);
          if (!!user && !user.IsAnonymous) {
            this.authUser = cloneDeep(user);
          } else{
            this.authUser = null;
          }
        });
  }

  sendEmailVerification() {
    this.authService.verifyEmail()
      .then(() => {
        this.toastService.show(this.labels.emailVerification, { icon: 'envelope-open-text' });

      }).catch(() => {
        this.toastService.show(this.labels.emailVerificationFailed,
          { icon: 'envelope-open-text', type: toastType.ERROR });
      });
  }

  routeToProfileEdit() {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
  }

}
