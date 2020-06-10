import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthModalService } from '../../auth-modal/auth-modal.service';
import { AuthMessages } from '../../../../helpers/constants';
import { SubSink } from 'subsink';
import { AuthService } from '../../auth.service';
import { ToastService } from 'src/app/modules/shared/toasts/toast.service';
 

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit, AfterViewInit {
  authMessages = AuthMessages;
  labels = AuthMessages.authAnchorLabels;

  @ViewChild('authSuccessToast') authSuccessToast: TemplateRef<any>;

  private subs = new SubSink();

  @ViewChild('password') private passwordElement: ElementRef;

  @Input() email: string;
  @Input() isExisting: boolean;

  loginForm: FormGroup;
  isLoginInProgress = false;
  isGoogleLoginInProgress = false;
  isLoginSuccess = true;
  isValidForm = false;
  alertMessage: string;


  constructor(
    public authModalService: AuthModalService,
    private authService: AuthService,
    private toastService: ToastService

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
      .then(resp => this.handleAuthSuccess(resp))
      .catch(error =>this.handleAuthFailure(error))
      .finally(() => this.handleAuthFinalize());
  }


  loginWithGoogle() {
    this.isGoogleLoginInProgress = true;
    this.authService.loginWithGoogle()
      .then(response => this.handleAuthSuccess(response))
      .catch(err => this.handleAuthFailure(err))
      .finally(()=> this.isGoogleLoginInProgress = false);

  }

  register() {
    this.authService.registerUser(this.loginForm.value)
      .then(resp => this.handleAuthSuccess(resp))
      .catch(error => this.handleAuthFailure(error))
      .finally(() => this.handleAuthFinalize());
  }

  private handleAuthSuccess(response) {
    console.log('handleAuthSuccess called', response);
    this.isLoginSuccess = true;
    this.authModalService.dismissModal();
    this.toastService.show(this.authMessages.loginSuccess,{ icon:'user-lock'});
  }

  private handleAuthFailure(error){
    console.log('handleAuthFailure called', error);
    this.isLoginSuccess = false;
    this.setAlertMessage(error.code);
   
  }

  private handleAuthFinalize(){
    this.isLoginInProgress = false;
  }

  private setAlertMessage(code: string) {
    this.alertMessage = AuthMessages.invalidCredentials.find(item => item.code === code).message;
  }

  closeAlert() {
    this.isLoginSuccess = true;
  }



}
