import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { ObjectTransformerService } from 'src/app/services/object-transformer.service';
import { Store } from '@ngrx/store';
import { AppState } from '../main/store/app.reducer';
import { SubSink } from 'subsink';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  private subs = new SubSink();
  authUser: User;

  constructor(
    public authService: AuthService
    ) { }

  ngOnInit(): void {

    this.authService.user$.subscribe();

    this.subs.sink = 
    this.authService.userFromStore$.subscribe(user => {
      console.log('auth user   = ', user);
      window['authuser'] = user;
      this.authUser = user;
    });

  }

}
