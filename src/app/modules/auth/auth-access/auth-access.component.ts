import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-auth-access',
  templateUrl: './auth-access.component.html',
  styleUrls: ['./auth-access.component.scss']
})
export class AuthAccessComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  constructor(private authService: AuthService) { }

  isLoginSelected: boolean = true;

  ngOnInit(): void {
    this.subs.sink = this.authService.getUserFromStore().subscribe((user: User) => {
      console.log('store user subscription ', user);
    });
  }


  onIsLoginSelected(value: boolean) {
    this.isLoginSelected = true;
  }

  onRegisterSelected(value: boolean) {
    this.isLoginSelected = false;
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }
}
