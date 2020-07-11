import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { SubSink } from 'subsink';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  authUser: User;

  constructor(
    public authService: AuthService
    ) { }

  ngOnInit(): void {
    this.subs.sink = 
    this.authService.user$.subscribe(user => console.log("syncUser = ", user));

  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

}
