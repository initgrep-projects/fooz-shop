import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase/app';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, take, tap, catchError } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { ObjectTransformerService } from 'src/app/services/object-transformer.service';
import { UserRemoteService } from 'src/app/services/remote/user-remote.service';
import { AppState } from '../main/store/app.reducer';
import { addUserAction, deleteUserAction } from './store/auth.actions';
import { toObservable } from 'src/app/util/app.lib';
import { ToastService } from '../shared/toasts/toast.service';
import { AuthMessages as labels } from 'src/app/util/app.labels';

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
  }


  /**
   * Every auth change be it anonymous, login, login with google or registeration
   * will trigger the push in this subscription.
   * This method will check 
   * 1) if no auth -> return an anonymous auth
   * 2) if auth -> return an auth
   * 3) convert firebaseCredentials.user to @see User
   */

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
        }),
        tap(user => {
          if (!!user) {
            this.store.dispatch(addUserAction({ payload: user }));
          }
        })
      );
  }

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

  private loginAsAnonymous(): Observable<User> {
    console.log('Goiong Anonymous.. since no auth-user found');
    return from(firebase.auth().signInAnonymously())
      .pipe(map(credentials => this.transformService.transformUser(credentials.user)));


  }

  loginWithGoogle(): Observable<User> {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return from(this.angularFireAuth.auth.signInWithPopup(provider))
      .pipe(
        map(credential => this.transformService.transformUser(credential.user)),
        tap(user => this.saveUser(user))
      );
  }


  loginWithUserPass(value: { email: string, password: string }) {
    return from(firebase.auth().signInWithEmailAndPassword(value.email, value.password));

  }

  registerUser(value: { email: string, password: string }): Observable<User> {
    const credentials = firebase.auth.EmailAuthProvider.credential(value.email, value.password);
    return from(firebase.auth().currentUser.linkWithCredential(credentials))
      .pipe(
        map(credential => this.transformService.transformUser(credential.user)),
        tap(user => this.saveUser(user))
      );
  }

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

  async logOut() {
    console.log("logout called");
    try {
      await firebase.auth().signOut();
      this.toastService.success(labels.logoutSuccess, 'sign-out-alt');
      this.deleteUserFromStore();
    }
    catch (e) {
      return this.toastService.failure(labels.logoutFail);
    }
  }

  getUser(id: string): Observable<User> {
    return this.db.fetchUser(id);
  }

  getUserByEmail(value: { email: string }): Observable<User[]> {
    return this.db.fetchUserByEmail(value.email)
      .pipe(take(1));
  }

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


  updateUser(user: User): Observable<boolean> {
    return this.db.updateUser(user)
      .pipe(
        tap(isOK => {
          if (isOK) {
            this.store.dispatch(addUserAction({ payload: user }));
            this.toastService.success(labels.profileUpdateSuccess, 'user');
          }
        }),
        catchError(error => {
          this.toastService.failure(labels.profileUpdateSuccess, 'fasUser');
          return of(error);
        })
      );
  }

  deleteUserFromStore() {
    this.store.dispatch(deleteUserAction({ payload: 'anything' }));
  }


}
