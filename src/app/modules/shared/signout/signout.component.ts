import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthMessages } from 'src/app/util/app.labels';
import { SubSink } from 'subsink';
import { AuthService } from '../../auth/auth.service';



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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subs.sink =
      this.authService.userFromStore$.subscribe(user => {
        this.authUser = user;
      });
  }

  logOut() {
    this.subs.sink = this.authService.logOut().subscribe();

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
