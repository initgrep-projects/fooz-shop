import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthAccessComponent } from './auth-access/auth-access.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLoginComponent } from './auth-access/auth-login/auth-login.component';
import { AuthRegisterComponent } from './auth-access/auth-register/auth-register.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [AuthComponent, AuthModalComponent, AuthAccessComponent, AuthLoginComponent, AuthRegisterComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AuthRoutingModule,
    SharedModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    NgbAlertModule
  ],
  exports:[
    AuthComponent
  ]
})
export class AuthModule { }
