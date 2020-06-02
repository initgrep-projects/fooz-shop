import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthModalService } from '../../auth-modal/auth-modal.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {
  
  @Output() registerSelected = new EventEmitter<boolean>();
  
  loginForm: FormGroup;
  constructor(
    public authModalService: AuthModalService
  ) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password':new FormControl(null, [Validators.required ])
    });
  }

  login(){
    console.log('login onsubmit = ', this.loginForm);
  }

  emitRegisterSelected(){
    this.registerSelected.emit(true);
  }

}
