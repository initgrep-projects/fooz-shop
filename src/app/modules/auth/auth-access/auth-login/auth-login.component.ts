import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthModalService } from '../../auth-modal/auth-modal.service';
import { AuthMessages } from '../../../../helpers/constants';
import { SubSink } from 'subsink';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {

  readonly authMessages: any = AuthMessages;
  private subs = new SubSink();
  @Output() registerSelected = new EventEmitter<boolean>();

  loginForm: FormGroup;
  isLoginInProgress = false;
  isLoginSuccess = true;
  isValidForm = false;


  constructor(
    public authModalService: AuthModalService,
    private authSerivce: AuthService

  ) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
    });

    this.subs.sink =
      this.loginForm.statusChanges.subscribe(status => {
        this.isValidForm = status !== 'INVALID';
      });

  }

  login() {
    this.isLoginInProgress = true;
    console.log('login onsubmit = ', this.loginForm);
    this.authSerivce.loginWithUserPass(this.loginForm.value)
      .then(resp => this.isLoginSuccess = true)
      .catch(error => this.isLoginSuccess = false)
      .finally(() => this.isLoginInProgress = false);

  }

  loginWithGoogle() {
    this.authSerivce.loginWithGoogle()
      .then(result => console.log('register result = ', result))
      .catch(err => console.error('register error = ', err));

  }

  closeAlert() {
    this.isLoginSuccess = true;
  }
  emitRegisterSelected() {
    this.registerSelected.emit(true);
  }

}
