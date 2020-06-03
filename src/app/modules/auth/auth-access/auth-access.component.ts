import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-access',
  templateUrl: './auth-access.component.html',
  styleUrls: ['./auth-access.component.scss']
})
export class AuthAccessComponent implements OnInit {

  constructor(private authService: AuthService) { }

  isLoginSelected: boolean = false;

  ngOnInit(): void {

  }

  login() {
    this.authService.loginWithGoogle()
      .then(result => console.log('authResult = ', result))
      .catch(err => console.error('authError = ', err));

  }


  onIsLoginSelected(value: boolean){
    this.isLoginSelected = true;
  }

  onRegisterSelected(value: boolean){
    this.isLoginSelected = false;
  }


  // tryRegister(value){
  //   this.authService.doRegister(value)
  //   .then(res => {
  //     console.log(res);
  //     this.errorMessage = "";
  //     this.successMessage = "Your account has been created";
  //   }, err => {
  //     console.log(err);
  //     this.errorMessage = err.message;
  //     this.successMessage = "";
  //   })
  // }
}
