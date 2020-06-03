import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthModalService } from '../../auth-modal/auth-modal.service';
import { AuthMessages } from '../../../../helpers/constants';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {
  
  readonly authMessages: any = AuthMessages;
  private subs =  new SubSink();
  @Output() registerSelected = new EventEmitter<boolean>();
  
  loginForm: FormGroup;
  isSubmitted = false;
  isValidForm = false;


  constructor(
    public authModalService: AuthModalService,
  
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
    this.isSubmitted = true;
    window['loginForm'] = this.loginForm;
    console.log('login onsubmit = ', this.loginForm);
  }

 

  emitRegisterSelected() {
    this.registerSelected.emit(true);
  }

}
