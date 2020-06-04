import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthModalService } from '../../auth-modal/auth-modal.service';
import { AuthMessages } from 'src/app/helpers/constants';
import { SubSink } from 'subsink';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss']
})
export class AuthRegisterComponent implements OnInit {
  readonly authMessages: any = AuthMessages;
  @Output() loginSelected = new EventEmitter<boolean>();
  private subs = new SubSink();

  registerForm: FormGroup;
  isValidForm = false;
  isSignUpInProgress = false;
  isSignupSuccess = true;

  constructor(
    public authModalService: AuthModalService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone': new FormControl(null, [Validators.required,
      Validators.minLength(10),
      Validators.maxLength(13),
      Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
    });

    this.subs.sink =
      this.registerForm.statusChanges.subscribe(status => {
        this.isValidForm = status !== 'INVALID';
      });

  }

  closeAlert() {
    this.isSignupSuccess = true;
  }
  emitLoginSelected() {
    this.loginSelected.emit(true);
  }

  register() {
    console.log('registerform value = ', this.registerForm.value);
    this.isSignUpInProgress = true;
    this.authService.registerUser(this.registerForm.value)
      .then(response => this.isSignupSuccess = true)
      .catch(error => this.isSignupSuccess = false)
      .finally(() => this.isSignUpInProgress = false);
  }
}
