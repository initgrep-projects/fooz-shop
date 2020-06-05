import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, tap } from 'rxjs/operators';
import { Observable, from, defer, BehaviorSubject, observable } from 'rxjs';
import * as firebase from 'firebase/app'
import { Store } from '@ngrx/store';
import { AppState } from '../main/store/app.reducer';
import { User } from 'src/app/models/user';
import { addUserAction, deleteUserAction } from './store/auth.actions';
import { ObjectTransformerService } from 'src/app/services/object-transformer.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  user$: Observable<any>;
  counter = 1;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private store: Store<AppState>,
    private transformService: ObjectTransformerService
  ) {

    window['logout'] = this.logOut
    // window['loginAsAnonymous'] = this.loginAsAnonymous;
    // window['register'] = this.registerUser;
    // window['login'] = this.loginWithUserPass;
  // this.logOut(); 
    this.user$ = this.angularFireAuth.user
      .pipe(
        map((user: firebase.User) => {
          return !!user ? this.transformService.transformUser(user) : null
        }),
        tap((user: User) => {
          if (!!user) {
            this.saveUserToStore(user);
          }else{
            // this.loginAsAnonymous();
          }
        })

      );
  }

  loginAsAnonymous() {
    console.log("Goiong Anonymous.. since no auth-user found");
    // return firebase.auth().signInAnonymously();

  }

  loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
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
          this.saveUserToStore(this.transformService.transformUser(authCredentials.user));
          //save user to db also
          resolve(authCredentials);
        })
        .catch(error => {
          console.error('error happende during registeration ', error);
          reject(error);
        })
    });

  }


  logOut() {
    return firebase.auth().signOut();

  }

  saveUserToStore(user: User) {
    this.store.dispatch(addUserAction({ payload: user }));
  }

  deleteUserFromStore() {
    this.store.dispatch(deleteUserAction({ payload: 'anything' }));
  }

  userFromStore$ = this.store.select('auth')
    .pipe(map(state => state.user));


}
