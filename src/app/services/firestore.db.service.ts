import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FakedataService } from './fakedata.service';
import { Product } from '../models/product';

import { classToPlain } from 'class-transformer';
import { ObjectTransformerService } from './object-transformer.service';
import { map } from 'rxjs/operators';
import { Category } from '../models/category';
import { Currency } from '../models/currency';

@Injectable({
  providedIn: 'root'
})
export class FireStoreDbService {

  private productsCollection: AngularFirestoreCollection<Product>;


  constructor(private db: AngularFirestore,
              private fakedataService: FakedataService,
              private objTransformer: ObjectTransformerService) { }




  getProducts() {
    return this.db.collection('Products').valueChanges()
      .pipe(
        map(products => this.objTransformer.transformProducts(products))
      );
  }

  getCategories() {
    return this.db.collection('Categories').valueChanges()
      .pipe(
        map(categories => this.objTransformer.transformCategories(categories))
      );
  }

  getColors() {
    return this.db.collection('Colors').valueChanges()
      .pipe(
        map(colors => this.objTransformer.transformColors(colors))
      );
  }



}
