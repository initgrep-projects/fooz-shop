import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { fadeIn } from 'src/app/animations/fadeAnimation';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { AuthMessages } from 'src/app/util/app.labels';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss'],
  animations: [
    fadeIn
  ]
})
export class UserProfileEditComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  authUser: User;
  labels = AuthMessages;
  editProfileForm: FormGroup;
  isSaveProgress = false;


  constructor(
    private authService: AuthService,
    private location: Location
  ) { }

  ngOnInit(): void {

    this.initForm();

    this.subs.sink =
      this.authService.userFromStore$
        .subscribe((user: User) => {
          if (!!user && !user.IsAnonymous) {
            this.setFormValues(user);
            this.authUser = cloneDeep(user);
          }
        });
  }

  initForm() {
    this.editProfileForm = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.max(100)]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'phone': new FormControl('', [Validators.required, Validators.pattern('^[+]?[0-9]{12}')])
    });
  }

  setFormValues(user: User) {
    this.editProfileForm.setValue({
      'name': user.Name,
      'email': user.Email,
      'phone': user.PhoneNumber
    });
  }

  updateUserProfile({ email, name, phone }) {

    if (!!email && email !== this.authUser.Email) {
      this.authUser.Email = email;
      this.authUser.IsAnonymous = false;
    }
    if (!!phone) {
      this.authUser.PhoneNumber = phone;
    }
    if (!!name) {
      this.authUser.Name = name;
    }

    this.authService.updateUser(this.authUser)
      .subscribe(isok => this.location.back());
  }

  onPhoneChange(errors) {
    console.log('errors = ', errors);
  }

  async submit() {
    this.isSaveProgress = true;
    await this.updateUserProfile(this.editProfileForm.value);
    this.isSaveProgress = false;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
