import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as firebase from 'firebase/app';
import { Store } from '@ngrx/store';
import { AppState } from '../main/store/app.reducer';
import { User } from 'src/app/models/user';
import { addUserAction, deleteUserAction } from './store/auth.actions';
import { ObjectTransformerService } from 'src/app/services/object-transformer.service';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';
import { async } from '@angular/core/testing';

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
    private db: FireStoreDbService
  ) {

    window['logout'] = this.logOut;
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
        tap((user: firebase.User) => {
          if (!user) {
            this.loginAsAnonymous();
          }
        }),

        switchMap((user: firebase.User) => {
          console.log('user in switchmap = ', user?.uid, user?.email);
          if (!user) {
            return of(null);
          } else if (user.isAnonymous) {
            return of(this.transformService.transformUser(user));
          } else if (user.emailVerified) {
            const authUser = this.transformService.transformUser(user);
            this.db.saveUser(authUser);
          }
          return this.db.fetchUser(user.uid);
        }),
        map((user: User) => {
          console.log('tap user ', user?.UID, user?.Email);
          if (!!user) {
            this.saveUserToStore(user);
          }
          return user;
        })

      );
  }


  loginAsAnonymous() {
    console.log('Goiong Anonymous.. since no auth-user found');
    return firebase.auth().signInAnonymously();

  }

  loginWithGoogle() {

    return new Promise(async (resolve, reject) => {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        const authCredentials = await this.angularFireAuth.auth.signInWithPopup(provider);
        console.log('google login authcredentials ->', authCredentials);
        const authUser = this.transformService.transformUser(authCredentials.user);
        await this.db.saveUser(authUser);
        this.saveUserToStore(authUser);
        resolve(authCredentials);
      } catch (e) {
        reject(e);
      }
    });
  }



  loginWithUserPass(value: { email: string, password: string }) {
    return firebase.auth().signInWithEmailAndPassword(value.email, value.password);

  }

  registerUser(value: { email: string, password: string }) {
    return new Promise(async (resolve, reject) => {
      try {
        const credentials = firebase.auth.EmailAuthProvider.credential(value.email, value.password);
        const authCredentials = await firebase.auth().currentUser.linkWithCredential(credentials);
        console.log('user upgraded after registeration ', authCredentials);
        const authUser = this.transformService.transformUser(authCredentials.user);
        await this.db.saveUser(authUser);
        this.saveUserToStore(authUser);
        resolve(authCredentials);
      } catch (e) {
        reject(e);
      }

    });
  }

  async verifyEmail(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = firebase.auth().currentUser;
        console.log('current loggedin User = ', user.uid, user.email, user.emailVerified);
        await user.sendEmailVerification();
        console.log('verification success');
        resolve();
      } catch (error) {
        console.error('email verify errored', error);
        reject(error);
      }

    });

  }

  logOut(): Promise<void> {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut()
        .then(() => {
          this.deleteUserFromStore();
          resolve();
        })
        .catch(() => reject())
    });

  }

  async syncUser(user: firebase.User): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const authUser = this.transformService.transformUser(user);
        console.log('authuser found = ', authUser);
        await this.db.saveUser(authUser);
        console.log('db save done - sync in local store');
        this.saveUserToStore(authUser);
        console.log('sync in local store done');
        resolve(authUser);
      } catch (e) {
        console.log('error in syncuser -> ', e);
        reject(e);
      }


    });
  }

  getUserByEmail(value: { email: string }) {
    return this.db.fetchUserByEmail(value.email)
      .pipe(take(1));
  }



  saveUserToStore(user: User) {
    this.store.dispatch(addUserAction({ payload: user }));
  }

  deleteUserFromStore() {
    this.store.dispatch(deleteUserAction({ payload: 'anything' }));
  }


}
