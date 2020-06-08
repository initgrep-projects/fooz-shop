import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthModalService } from '../../auth-modal/auth-modal.service';
import { SubSink } from 'subsink';
import { AuthService } from '../../auth.service';
import { isEmpty } from 'src/app/helpers/util';
import { AuthMessages } from '../../../../helpers/constants';

export interface confirmedUser {
  email: string;
  isExisting: boolean;
  isOpFinished: boolean;
};


@Component({
  selector: 'app-auth-confirm',
  templateUrl: './auth-confirm.component.html',
  styleUrls: ['./auth-confirm.component.scss']
})
export class AuthConfirmomponent implements OnInit {

  private subs = new SubSink();

  authMessages = AuthMessages;
  confirmForm: FormGroup;
  isValidForm = false;
  isConfirmInProgress = false;


  @Output() userConfirmed = new EventEmitter<confirmedUser>();

  constructor(
    public authModalService: AuthModalService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.confirmForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email])
    });

    this.subs.sink =
      this.confirmForm.statusChanges.subscribe(status => {
        this.isValidForm = status !== 'INVALID';
      });

  }

  confirmUser() {
    console.log('confirm Form value = ', this.confirmForm.value);
    this.isConfirmInProgress = true;
    this.authService.getUserByEmail(this.confirmForm.value).subscribe(users => {
      if (!isEmpty(users) && users.length === 1) {
        console.log('user is present - redirect to sign in/ singup');
        this.userConfirmed.emit({ email: this.confirmForm.value.email, isExisting: true, isOpFinished: true });
      } else {
        this.userConfirmed.emit({ email: this.confirmForm.value.email, isExisting: false, isOpFinished: true });
      }

      this.isConfirmInProgress = false;
    });
  }

 
}
