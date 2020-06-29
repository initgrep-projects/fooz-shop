import { Injectable } from '@angular/core';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private db: FireStoreDbService
  ) {
  }

  lookbookItems$ = this.db.fetchLookBookItems();

}
