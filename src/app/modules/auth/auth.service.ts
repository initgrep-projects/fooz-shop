import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, tap, map, switchMap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import * as firebase from 'firebase/app'
import { Store } from '@ngrx/store';
import { AppState } from '../main/store/app.reducer';
import { User } from 'src/app/models/user';
import { addUserAction } from './store/auth.actions';
import { ObjectTransformerService } from 'src/app/services/object-transformer.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  user$: Observable<any>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private store: Store<AppState>,
    private transformService: ObjectTransformerService
  ) {

    this.signout();
    this.user$ = this.angularFireAuth.user
      .pipe(
        tap(user => {
          console.log('login check => ', user?.isAnonymous);
        }),
        map(user => {
          if(user) return user;
          else from(this.loginAsAnonymous())
        }),
        map(user => {
          console.log('user in second map', user);
          if (user) {
            const appUser =  transformService.transformUser(user);
            /** TODO TMRW
             * if(it is anonymous user)
             *    save it to store directly. since we dont know who the person is
             * else 
             *   fetch the user object from db since this is signin and user might have already added additional details
             *  save it to the store.
             */
            this.saveUserToStore(appUser);
            return appUser;
            }
            return null;
        })
      );
  }




  loginAsAnonymous() {
    return firebase.auth().signInAnonymously();

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
    return firebase.auth().createUserWithEmailAndPassword(value.email, value.password);
  }

  signout() {
    return firebase.auth().signOut();
  }

  saveUserToStore(user: User) {
    this.store.dispatch(addUserAction({ payload: user }));
  }

  getUserFromStore(){
    return this.store.select('auth')
    .pipe(map(state => state.user));
  }

}
