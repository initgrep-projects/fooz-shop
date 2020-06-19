import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubSink } from 'subsink';
import { AuthMessages } from 'src/app/util/app.labels';
import { User } from 'src/app/models/user';
import { cloneDeep } from 'lodash';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { ToastService, toastType } from 'src/app/modules/shared/toasts/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss']
})
export class UserProfileEditComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  authUser: User;
  labels = AuthMessages;
  editProfileForm: FormGroup;
  isSaveProgress = false;


  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
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
      'phone': new FormControl('', [Validators.required, Validators.min(8), Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')])
    });
  }

  setFormValues(user: User) {
    this.editProfileForm.setValue({
      'name': user.Name,
      'email': user.Email,
      'phone': user.PhoneNumber
    });
  }

  async updateUserProfile({ email, name, phone }) {
    try {
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
      this.authService.saveUserInStore(this.authUser);
      await this.authService.saveUserInDb(this.authUser);
      this.toastService.show(this.labels.profileUpdateSuccess, { icon: 'user' });
      this.router.navigate(['my/account/profile']);
      
    } catch (e) {
      this.toastService.show(this.labels.profileUpdateSuccess, { icon: 'fasUser', type: toastType.ERROR });
    }

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
