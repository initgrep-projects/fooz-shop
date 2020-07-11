import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import { fadeIn } from 'src/app/animations/fadeAnimation';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { AuthMessages } from 'src/app/util/app.labels';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  animations: [
    fadeIn
  ]
})
export class UserProfileComponent implements OnInit, OnDestroy {
  labels = AuthMessages;
  private subs = new SubSink();
  authUser: User;

  constructor(
    private authService: AuthService,
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
          } else {
            this.authUser = null;
          }
        });
  }

  sendEmailVerification() {
    this.subs.sink =
      this.authService.verifyEmail().subscribe();
  }

  routeToProfileEdit() {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
