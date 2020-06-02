import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth) { }


  loginWithGoogle(){
    return new Promise<any>((resolve, reject) => {

      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.angularFireAuth.auth
      .signInWithPopup(provider)
      .then(result => {
        resolve(result);
      }).catch(error=> {reject(error)});
    });
  }

  doRegister(value: {email: string, password: string}){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }
}
