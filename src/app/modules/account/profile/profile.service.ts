import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { map } from 'rxjs/operators';
import { AlertConfig, AlertType } from '../../shared/alert/alert.component';
import { AuthMessages as labels } from 'src/app/util/app.labels';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private authService: AuthService
  ) { }


  isInvalidProfile$ =
    this.authService.userFromStore$
      .pipe(
        map(user => {
          if (!user.Name || !user.PhoneNumber || !user.IsEmailVerified) {
            const alertConfig: AlertConfig = {
              type: AlertType.DANGER,
              title: labels.profileUpdateAlertTitle,
              messages: [],
              control: {
                title: labels.formLabels.editProfile,
                icon: 'edit'
              }
            }
            if (!user.Name) {
              alertConfig.messages.push(labels.NameNotPresent);
            }
            if (!user.PhoneNumber) {
              alertConfig.messages.push(labels.PhoneNotPresent);
            }
            if (!user.IsEmailVerified) {
              alertConfig.messages.push(labels.EmailNotVerified);
            }
            return alertConfig;
          }
          return null;
        })
      );

}
