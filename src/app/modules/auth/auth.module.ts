import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbAlertModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { AuthAccessComponent } from './auth-access/auth-access.component';
import { AuthConfirmomponent } from './auth-access/auth-confirm/auth-confirm.component';
import { AuthLoginComponent } from './auth-access/auth-login/auth-login.component';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { AuthPopupComponent } from './auth-popup/auth-popup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';




@NgModule({
  declarations: [
    AuthComponent,
    AuthModalComponent,
    AuthAccessComponent,
    AuthLoginComponent,
    AuthConfirmomponent,
    AuthPopupComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AuthRoutingModule,
    SharedModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    NgbAlertModule,
    NgbPopoverModule
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule { }
