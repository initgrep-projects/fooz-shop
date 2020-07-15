import { BuiltinType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase/app';
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

  constructor(
    private angularFireAuth: AngularFireAuth,
    private store: Store<AppState>,
    private transformService: ObjectTransformerService,
    private db: UserRemoteService,
    private toastService: ToastService
  ) {

    this.userFromStore$ = this.store.select('auth').pipe(map(state => state.user));
    this.user$ = this.syncAuthChanges();
    window['firebase'] = firebase;
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
    return from(firebase.auth().signInAnonymously())
      .pipe(map(credentials => this.transformService.transformUser(credentials.user)));
  }

  //DONE
  loginWithGoogle(): Observable<boolean> {
    return defer(async () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      const cred = await this.angularFireAuth.auth.signInWithPopup(provider);
      return cred.user;
    })
      .pipe(
        map(user => this.transformService.transformUser(user)),
        switchMap(user => this.saveUser(user))
      );
  }

  //DONE
  loginWithUserPass(value: { email: string, password: string }) {
    return from(firebase.auth().signInWithEmailAndPassword(value.email, value.password));

  }

  //DONE
  registerUser(value: { email: string, password: string }): Observable<boolean> {
    return defer(async () => {
      const cred = await firebase.auth().createUserWithEmailAndPassword(value.email, value.password);
      return cred.user;
    })
      .pipe(
        map(user => this.transformService.transformUser(user)),
        switchMap(user => this.saveUser(user))
      );
  }


  //DONE
  verifyEmail(): Observable<boolean> {
    return toObservable(firebase.auth().currentUser.sendEmailVerification())
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
    return toObservable(firebase.auth().sendPasswordResetEmail(email))
      .pipe(
        tap(isOK => {
          if (isOK) {
            this.toastService.success(labels.passwordReset, 'unlock-alt')
          }
        }),
        catchError(error => {
          this.toastService.failure(labels.passwordReset, 'unlock-alt')
          return of(error);
        })
      )
  }

  //DONE
  logOut() {
    console.log("logout called");
    return defer(async () => {
      await firebase.auth().signOut();
      return true;
    })
      .pipe(
        tap(ok => {
          if (ok) {
            this.deleteUserFromStore();
            this.toastService.success(labels.logoutSuccess, 'sign-out-alt');
          }
        }),
        catchError(e => {
          this.toastService.failure(labels.logoutFail);
          return of(e);
        })
      );

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
      await firebase.auth().currentUser.updateEmail(user.Email);
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
      const methods = await firebase.auth().fetchSignInMethodsForEmail(email);
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
