import { Injectable } from '@angular/core';
import { getAuth,  createUserWithEmailAndPassword, fetchSignInMethodsForEmail, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInAnonymously, signInWithEmailAndPassword, updateEmail, Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import { isEmpty } from 'lodash';
import { defer, from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { ObjectTransformerService } from 'src/app/services/object-transformer.service';
import { UserRemoteService } from 'src/app/services/remote/user-remote.service';
import { AuthMessages as labels } from 'src/app/util/app.labels';
import { toObservable } from 'src/app/util/app.lib';
import { AppState } from '../main/store/app.reducer';
import { ToastService } from '../shared/toasts/toast.service';
import { addUserAction, deleteUserAction } from './store/auth.actions';

export enum signInType {
  NONE,
  GOOGLE,
  PASSWORD
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  userFromStore$: Observable<User>;
  auth:Auth;


  constructor(
    private angularFireAuth: AngularFireAuth,
    private store: Store<AppState>,
    private transformService: ObjectTransformerService,
    private db: UserRemoteService,
    private toastService: ToastService,
  ) {

    this.userFromStore$ = this.store.select('auth').pipe(map(state => state.user));
    this.user$ = this.syncAuthChanges();
    this.auth =  getAuth()
  }



  /**
   * Every auth change be it anonymous, login, login with google or registeration
   * will trigger the push in this subscription.
   * This method will check
   * 1) if no auth -> return an anonymous auth
   * 2) if auth -> return an auth
   * 3) convert firebaseCredentials.user to @see User
   */

  //DONE
  private syncAuthChanges(): Observable<User> {
    return this.angularFireAuth.user
      .pipe(
        map(user => this.transformService.transformUser(user)),
        switchMap((user) => !!user ? of(user) : this.loginAsAnonymous()),
        switchMap(user => {
          if (user.IsAnonymous) {
            return of(user);
          } else if (user.IsEmailVerified) {
            return this.updateEmailIfNotUpdated(user);
          }
          return this.db.fetchUser(user.UID);
        }),
        tap(user => {
          if (!!user) {
            this.store.dispatch(addUserAction({ payload: user }));
          }
        })
      );
  }

  //DONE
  private updateEmailIfNotUpdated(user: User): Observable<User> {
    return this.getUser(user.UID)
      .pipe(
        take(1),
        switchMap(dbUser => {
          if (!!dbUser && !dbUser.IsEmailVerified) {
            dbUser.IsEmailVerified = true;
            return this.db.updateUser(dbUser);
          }
          return of(true);
        }),
        switchMap(isUpdated => isUpdated ? this.db.fetchUser(user.UID) : of(user))
      );
  }

  //DONE
  private loginAsAnonymous(): Observable<User> {
    console.log('Goiong Anonymous.. since no auth-user found');
    return from(signInAnonymously(this.auth))
      .pipe(map(credentials => this.transformService.transformUser(credentials.user)));
  }

  //DONE
  loginWithGoogle(): Observable<boolean> {
    return defer(async () => {
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      const cred = await this.angularFireAuth.signInWithPopup(provider);
      return cred.user;
    })
      .pipe(
        map(user => this.transformService.transformUser(user)),
        switchMap(user => this.saveUser(user))
      );
  }

  //DONE
  loginWithUserPass(value: { email: string, password: string }) {
    return from(signInWithEmailAndPassword(this.auth,value.email, value.password));

  }

  //DONE
  registerUser(value: { email: string, password: string }): Observable<boolean> {
    return defer(async () => {
      const cred = await createUserWithEmailAndPassword(this.auth,value.email, value.password);
      return cred.user;
    })
      .pipe(
        map(user => this.transformService.transformUser(user)),
        switchMap(user => this.saveUser(user))
      );
  }


  //DONE
  verifyEmail(): Observable<boolean> {
    return toObservable(sendEmailVerification(this.auth.currentUser))
      .pipe(
        tap(isOK => {
          if (isOK) {
            this.toastService.success(labels.emailVerification, 'envelope-open-text');
          }
        }),
        catchError(error => {
          this.toastService.failure(labels.emailVerificationFailed, 'envelope-open-text');
          return of(error);
        })
      );
  }

  //DONE
  resetPassword(email: string): Observable<boolean> {
    return toObservable(sendPasswordResetEmail(this.auth, email))
      .pipe(
        tap(isOK => {
          if (isOK) {
            this.toastService.success(labels.passwordReset, 'unlock-alt')
          }
        }),
        catchError(error => {
          this.toastService.failure(labels.passwordResetFail, 'unlock-alt')
          return of(error);
        })
      )
  }

  //NOT DONE

  async logOut() {
    console.log("logout called");
    try {
      await this.auth.signOut();
      this.toastService.success(labels.logoutSuccess, 'sign-out-alt');
    }
    catch (error) {
      this.toastService.failure(labels.logoutFail);
    }
  }

  //DONE
  getUser(id: string): Observable<User> {
    return this.db.fetchUser(id);
  }

  //DONE
  getUserByEmail(value: { email: string }): Observable<User[]> {
    return this.db.fetchUserByEmail(value.email)
      .pipe(take(1));
  }

  //DONE
  saveUser(user: User) {
    return this.db.saveUser(user)
      .pipe(
        tap(isOK => {
          if (isOK) {
            this.store.dispatch(addUserAction({ payload: user }));
          }
        }),
        catchError(error => of(error))
      );
  }

  //DONE
  updateUser(user: User): Observable<boolean> {
    return defer(async () => {
      await updateEmail(this.auth.currentUser, user.Email)
      return true;
    })
      .pipe(
        switchMap(ok => ok ? this.db.updateUser(user) : of(ok)),
        tap(isOK => {
          if (isOK) {
            this.store.dispatch(addUserAction({ payload: user }));
            this.toastService.success(labels.profileUpdateSuccess, 'user');
          }
        }),
        catchError(error => {
          console.log(`error in update user ${error}`);
          this.toastService.failure(labels.profiledUpdatedFailure, 'fasUser');
          return of(error);
        })
      );
  }

  //DONE
  fetchSignInMethod(email: string): Observable<signInType[]> {
    return defer(async () => {
      const methods = await fetchSignInMethodsForEmail(this.auth,email);
      if (isEmpty(methods)) {
        return [signInType.NONE];
      }
      return methods.map(m => m === 'google.com' ? signInType.GOOGLE : signInType.PASSWORD)
    });
  }

  //DONE
  deleteUserFromStore() {
    this.store.dispatch(deleteUserAction());
  }

}
