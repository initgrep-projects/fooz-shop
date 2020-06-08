import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
export class AuthLoginComponent implements OnInit, AfterViewInit {
  authMessages =  AuthMessages;

  private subs = new SubSink();

  @ViewChild('password') private passwordElement: ElementRef;

  @Input() email: string;
  @Input() isExisting: boolean;

  loginForm: FormGroup;
  isLoginInProgress = false;
  isLoginSuccess = true;
  isValidForm = false;
  alertMessage:string;


  constructor(
    public authModalService: AuthModalService,
    private authService: AuthService

  ) { }

  ngAfterViewInit() {
    this.passwordElement.nativeElement.focus();
    console.log('isExisting after view init = ', this.isExisting);
  }

  ngOnInit(): void {
    console.log('isExisting on init = ', this.isExisting);
    this.loginForm = new FormGroup({
      'email': new FormControl(this.email || null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
    });

    this.subs.sink =
      this.loginForm.statusChanges.subscribe(status => {
        this.isValidForm = status !== 'INVALID';
      });
  }

  authenticate() {
    this.isLoginInProgress = true;
    console.log('isExisting -> ', this.isExisting);
    if (this.isExisting) {
      console.log('login called');
      this.login();
    } else {
      console.log('register called ');
      this.register();
    }
  }

  login() {
    console.log('login onsubmit = ', this.loginForm);
    this.authService.loginWithUserPass(this.loginForm.value)
      .then(resp => {
        this.isLoginSuccess = true;
        console.log('login success ', resp);
      })
      .catch(error => {
        this.isLoginSuccess = false;
        this.setAlertMessage(error.code);
        console.log('login failure',error);

      })
      .finally(() => this.isLoginInProgress = false);

  }


  register() {
    this.authService.registerUser(this.loginForm.value)
      .then(resp => this.isLoginSuccess = true)
      .catch(error => {
        this.isLoginSuccess = false;
        this.setAlertMessage(error.code);
      })
      .finally(() => this.isLoginInProgress = false);
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle()
      .then(response => console.log('register result = ', response))
      .catch(err => console.error('register error = ', err));

  }

  setAlertMessage(code:string){
   this.alertMessage =  AuthMessages.invalidCredentials.find(item => item.code === code).message;
  }

  closeAlert() {
    this.isLoginSuccess = true;
  }



}
