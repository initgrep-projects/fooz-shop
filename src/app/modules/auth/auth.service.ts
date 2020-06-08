import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, tap, switchMap, take } from 'rxjs/operators';
import { Observable, empty, EMPTY, of } from 'rxjs';
import * as firebase from 'firebase/app';
import { Store } from '@ngrx/store';
import { AppState } from '../main/store/app.reducer';
import { User } from 'src/app/models/user';
import { addUserAction, deleteUserAction } from './store/auth.actions';
import { ObjectTransformerService } from 'src/app/services/object-transformer.service';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private store: Store<AppState>,
    private transformService: ObjectTransformerService,
    private db: FireStoreDbService
  ) {

    window['logout'] = this.logOut;
    // window['loginAsAnonymous'] = this.loginAsAnonymous;
    // window['register'] = this.registerUser;
    // window['login'] = this.loginWithUserPass;
    // this.logOut();
    this.user$ = this.angularFireAuth.user
      .pipe(
        switchMap((user: firebase.User) => {
          console.log('user in switchmap = ', user);
          if (!user) {
            return of(null);
          } else if (user.isAnonymous) {
            return of(this.transformService.transformUser(user));
          }
          return this.db.fetchUser(user.uid);
        }),
        map((user: User) => {
          console.log('tap user ', user);
          if (!!user) {
            this.saveUserToStore(user);
          } else {
            this.loginAsAnonymous();
          }
          return user;
        })

      );
  }


  userFromStore$ = this.store.select('auth')
    .pipe(map(state => state.user));

  loginAsAnonymous() {
    console.log('Goiong Anonymous.. since no auth-user found');
    return firebase.auth().signInAnonymously();

  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return this.angularFireAuth.auth.signInWithPopup(provider);

  }

  loginWithUserPass(value: { email: string, password: string }) {
    return firebase.auth().signInWithEmailAndPassword(value.email, value.password);

  }

  registerUser(value: { email: string, password: string }) {
    // return firebase.auth().createUserWithEmailAndPassword(value.email, value.password);
    const credentials = firebase.auth.EmailAuthProvider.credential(value.email, value.password);
    return new Promise((resolve, reject) => {
      firebase.auth().currentUser.linkWithCredential(credentials)
        .then(authCredentials => {
          console.log('user upgraded after registeration ', authCredentials);
          const authUser = this.transformService.transformUser(authCredentials.user);
          this.db.saveUser(authUser).then(() => {
            console.log('Db save done, saving state in store');
            this.saveUserToStore(authUser);
          })
            .catch(error => reject(error));
          resolve(authCredentials);
        })
        .catch(error => {
          console.error('error happende during registeration ', error);
          reject(error);
        });
    });
  }


  logOut() :Promise<void> {
    return new Promise((resolve, reject)=>{
      firebase.auth().signOut()
      .then(()=> {
        this.deleteUserFromStore();
        resolve();
      })
      .catch(()=> reject())
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
