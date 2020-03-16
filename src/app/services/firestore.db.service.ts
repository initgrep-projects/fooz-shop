import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FakedataService } from './fakedata.service';
import { Product } from '../models/product';

import { classToPlain } from 'class-transformer';
import { ObjectTransformerService } from './object-transformer.service';
import { map, tap } from 'rxjs/operators';
import { Category } from '../models/category';
import { Currency } from '../models/currency';

@Injectable({
  providedIn: 'root'
})
export class FireStoreDbService {

   lastTimeStamp = 0;
   pageSize = 2;



  constructor(private db: AngularFirestore,
              private fakedataService: FakedataService,
              private objTransformer: ObjectTransformerService) { }



  saveProducts() {
    this.fakedataService.getProducts()
      .forEach(product => this.db.collection('Products').add(classToPlain(product)));
  }

  /**
   * add a different function for home component to fetch the latest onces only
   */
  fetchProducts() {
    return this.db.collection('Products', ref => ref
        .orderBy('timeStamp', 'asc')
        .limit(this.pageSize)
        .startAfter(this.lastTimeStamp)
      ).get()
        .pipe(
           map(querySnapShot => {
             const products: Product[] = [];
             querySnapShot.forEach(doc => {
               products.push(this.objTransformer.transformProductFromDocData(doc.data()));
             });
             this.lastTimeStamp = products[products.length - 1].timeStamp;
             return products;
           })
        );
  }

  fetchProductsForHome() {
    return this.db.collection('Products', ref => ref
        .orderBy('timeStamp', 'desc')
        .limit(10)
      ).get()
        .pipe(
           map(querySnapShot => {
             const products: Product[] = [];
             querySnapShot.forEach(doc => {
               products.push(this.objTransformer.transformProductFromDocData(doc.data()));
             });
             this.lastTimeStamp = products[products.length - 1].timeStamp;
             return products;
           })
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
