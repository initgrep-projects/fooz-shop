import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { SubSink } from 'subsink';
import { User } from 'src/app/models/user';
import { AuthService } from '../auth.service';
import { authAnchorLabels } from '../../../helpers/constants';

@Component({
  selector: 'app-auth-anchor',
  templateUrl: './auth-anchor.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./auth-anchor.component.scss']
})
export class AuthAnchorComponent implements OnInit, OnDestroy {
  labels = authAnchorLabels;

  private subs = new SubSink();
  authUser: User;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.subs.sink =
      this.authService.userFromStore$.subscribe(user => {
        console.log('auth user   = ', user);
        window['authuser'] = user;
        this.authUser = user;
      });

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
