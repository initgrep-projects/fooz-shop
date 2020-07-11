import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { classToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { USER_COLLECTION } from 'src/app/util/app.constants';
import { ObjectTransformerService } from '../object-transformer.service';

@Injectable({
  providedIn: 'root'
})
export class UserRemoteService {
  private userCollection: AngularFirestoreCollection<User>;
  constructor(
    private db: AngularFirestore,
    private objTransformer: ObjectTransformerService
  ) {
    this.userCollection = this.db.collection<User>(USER_COLLECTION);
  }



  /** Auth operations START */

  fetchUser(id: string): Observable<User> {
    return this.userCollection.doc(id).get()
      .pipe(
        map(querySnapShot => {
          return this.objTransformer.transformUserFromDocumentData(querySnapShot.data());
        })
      );
  }

  fetchUserByEmail(email: string): Observable<User[]> {
    return this.db.collection(USER_COLLECTION, ref =>
      ref.where('email', '==', email)
    )
      .get()
      .pipe(
        map(querySnapShot => {
          const users: User[] = [];
          querySnapShot.forEach(doc => {
            users.push(this.objTransformer.transformUserFromDocumentData(doc.data()));
          });
          return users;
        })
      );
  }
  /**
   * Save user in firebase db
   * @param user user object
   */
  saveUser(user: User) {
    console.log('saveUser called ->', classToPlain(user));
    return this.userCollection.doc(user.UID).set(classToPlain(user));
  }

  /**
   * update the user in firebase
   * @param user the user Object
   */
  updateUser(user: User) {
    return this.userCollection.doc(user.UID).update(classToPlain(user));
  }

  /**
   *  make user inactive
   * @param id the user id
   */
  deActivateUser(id: string) {
    return this.userCollection.doc(id).update({ active: false });
  }

  /**
   * delete the user
   * @param id the user id
   */
  deleteUser(id: string) {
    return this.userCollection.doc(id).delete();
  }

  /** Auth operations END */


}
