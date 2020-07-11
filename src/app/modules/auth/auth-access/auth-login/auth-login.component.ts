import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, TemplateRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthModalService } from '../../auth-modal/auth-modal.service';
import { AuthMessages } from '../../../../util/app.labels';
import { SubSink } from 'subsink';
import { AuthService } from '../../auth.service';
import { ToastService, toastType } from 'src/app/modules/shared/toasts/toast.service';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit, AfterViewInit, OnDestroy {
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
  passResetProgress = false;


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
    this.subs.sink = this.authService.loginWithUserPass(this.loginForm.value)
      .subscribe(
        (user) => this.handleAuthSuccess(),
        err => this.handleAuthFailure(err),
        () => this.handleAuthFinalize()
      );
  }


  loginWithGoogle() {
    this.isGoogleLoginInProgress = true;
    this.subs.sink = this.authService.loginWithGoogle()
      .subscribe(
        (user) => this.handleAuthSuccess(),
        err => this.handleAuthFailure(err),
        () => this.isGoogleLoginInProgress = false
      );
  }

  register() {
    this.subs.sink = this.authService.registerUser(this.loginForm.value)
      .subscribe(
        (user) => this.handleAuthSuccess(),
        err => this.handleAuthFailure(err),
        () => this.handleAuthFinalize()
      );
  }

  resetPassword() {
    this.passResetProgress = true;
    this.subs.sink = this.authService.resetPassword(this.loginForm.value.email)
      .subscribe(
        isSuccess => this.authModalService.dismissModal(),
        error => { },
        () => this.passResetProgress = false
      );
  }

  private handleAuthSuccess() {

    this.isLoginSuccess = true;
    this.authModalService.dismissModal();
    this.toastService.success(this.authMessages.loginSuccess, 'user-lock');
  }

  private handleAuthFailure(error) {
    console.log('handleAuthFailure called', error);
    this.isLoginSuccess = false;
    this.isLoginInProgress = false;
    this.setAlertMessage(error.code);

  }

  private handleAuthFinalize() {
    this.isLoginInProgress = false;
  }

  private setAlertMessage(code: string) {
    this.alertMessage = AuthMessages.invalidCredentials.find(item => item.code === code).message;
  }

  closeAlert() {
    this.isLoginSuccess = true;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


}
