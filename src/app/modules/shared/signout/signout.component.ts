import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthMessages } from 'src/app/util/app.labels';
import { SubSink } from 'subsink';
import { AuthService } from '../../auth/auth.service';
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
    public router: Router
  ) { }

  ngOnInit(): void {
    this.subs.sink =
      this.authService.userFromStore$.subscribe(user => {
        this.authUser = user;
      });
  }

  logOut() {
    this.subs.sink = this.authService.logOut()
      .subscribe(() => {
        this.router.navigate(['/shop']);
      })

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
