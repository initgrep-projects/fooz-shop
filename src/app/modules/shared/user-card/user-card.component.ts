import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthMessages } from 'src/app/util/app.labels';
import { SubSink } from 'subsink';
import { AuthService } from '../../auth/auth.service';


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
    this.subs.sink = 
    this.authService.verifyEmail().subscribe();
  }

  routeToAccount() {
    this.manageProfile.emit();
    this.router.navigate(['my/account']);

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
