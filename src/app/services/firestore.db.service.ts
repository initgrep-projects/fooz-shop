import { Injectable, Query } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FakedataService } from './fakedata.service';
import { Product } from '../models/product';

import { classToPlain } from 'class-transformer';
import { ObjectTransformerService } from './object-transformer.service';
import { map, tap } from 'rxjs/operators';
import { Category } from '../models/category';
import { Size } from '../models/size';
import { Sort } from '../models/Sort';
import { CustomSizeInput } from '../models/custom-size';
import { CartItem } from '../models/cartItem';


const CATEGORY_COLLECTION = 'Categories';
const PRODUCT_COLLECTION = 'Products';
const SIZE_COLLECTION = 'Sizes';
const SORT_COLLECTION = 'SortOrders';
const CUSTOM_SIZE_INPUT = 'CustomSizeInput';
const TREND_COLLECTION = 'Trend';
const CART_COLLECTION = 'Cart';


@Injectable({
  providedIn: 'root'
})
export class FireStoreDbService {

  lastTimeStamp = 0;
  pageSize = 2;



  constructor(
    private db: AngularFirestore,
    private fakedataService: FakedataService,
    private objTransformer: ObjectTransformerService) { }


  /**
   * save products in the db,
   */
  saveProducts() {
    this.fakedataService.getProducts()
      .forEach(product =>
        this.db.collection(PRODUCT_COLLECTION).add(classToPlain(product)));
  }

  /**
   * add a different function for home component to fetch the latest onces only
   */
  fetchProducts() {
    return this.db.collection(PRODUCT_COLLECTION, ref =>
      ref
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
          this.lastTimeStamp = products[products.length - 1].TimeStamp;
          return products;
        })
      );
  }




  /**
   * fetch more products for pagination
   */
  fetchMoreProducts() {
    return this.db.collection(PRODUCT_COLLECTION, ref => ref
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
          if (products.length > 0) {
            this.lastTimeStamp = products[products.length - 1].TimeStamp;
          }
          return products;
        })
      );
  }

  fetchProductsForHome() {
    return this.db.collection(PRODUCT_COLLECTION, ref => ref
      .orderBy('timeStamp', 'desc')
      .limit(10)
    ).get()
      .pipe(
        map(querySnapShot => {
          const products: Product[] = [];
          querySnapShot.forEach(doc => {
            products.push(this.objTransformer.transformProductFromDocData(doc.data()));
          });
          this.lastTimeStamp = products[products.length - 1].TimeStamp;
          return products;
        })
      );
  }

  fetchProductByid(id: string) {
    return this.db.collection(PRODUCT_COLLECTION, ref =>
      ref.where('id', '==', id)
    )
      .get()
      .pipe(
        map(querySnapShot => {

          let product: Product;
          querySnapShot.forEach(doc => {
            product = this.objTransformer.transformProductFromDocData(doc.data());
          });
          return product;

        })
      );
  }


  saveCategories() {
    this.fakedataService.getCategories()
      .forEach(product => this.db.collection(CATEGORY_COLLECTION).add(classToPlain(product)));
  }

  getCategories() {
    return this.db.collection(CATEGORY_COLLECTION)
      .get()
      .pipe(
        map(querySnapShot => {

          const categories: Category[] = [];
          querySnapShot.forEach(doc => {
            categories.push(this.objTransformer.transformCategoryFromDocData(doc.data()));
          });
          return categories;
        })
      );
  }

  saveSizes() {
    this.fakedataService.getSizes()
      .forEach(size => this.db.collection(SIZE_COLLECTION).add(classToPlain(size)));
  }

  getSizes() {
    return this.db.collection(SIZE_COLLECTION)
      .get()
      .pipe(
        map(querySnapShot => {
          const sizes: Size[] = [];
          querySnapShot.forEach(doc => {
            sizes.push(this.objTransformer.transformSizeFromDocData(doc.data()));
          });
          return sizes;
        })
      );
  }

  saveCustomSizeInputs() {
    const customSizeInput = this.fakedataService.getCustomSizeInput();
    this.db.collection(CUSTOM_SIZE_INPUT).add(classToPlain(customSizeInput));
  }

  fetchCustomSizeInputs() {
    return this.db.collection(CUSTOM_SIZE_INPUT)
      .get()
      .pipe(
        tap(querySnapShot => console.log('querySnapShot =>', querySnapShot)),
        map(querySnapShot => {
          let customSizeInput: CustomSizeInput;
          querySnapShot.forEach(doc => {
            customSizeInput = this.objTransformer.transformCustomSizeInput(doc.data());
          });
          return customSizeInput;
        })
      );
  }

  saveSortOrders() {
    this.fakedataService.getSortOrders()
      .forEach(order => this.db.collection(SORT_COLLECTION).add(classToPlain(order)));
  }


  getSortOrders() {
    return this.db.collection(SORT_COLLECTION)
      .get()
      .pipe(
        map(querySnapShot => {
          const sorts: Sort[] = [];
          querySnapShot.forEach(doc => {
            sorts.push(this.objTransformer.transformSortFromDocData(doc.data()));
          });
          return sorts;
        })
      );
  }

  fetchTrendItems() {
    return this.db.collection(TREND_COLLECTION)
    .get()
    .pipe(
      map(querySnapShot => {
        let items: string[] = [];
        querySnapShot.forEach(doc => {
         items =  [...doc.data().items];
        });
        return items;
      })
    );
  }

  /** cart Operations START
   *
   *  1) save an item to db
   *  2) if the item is already present -- increase quantity
   *    //update the item in db and store
   *
   *  3) update the item directly in cart ex: add remove more quanity
   *  4) delete the item
   *  4)  fetch all items
   */
  saveCartItemToDb(item: CartItem) {
    this.db.collection(CART_COLLECTION).add(classToPlain(item));
  }

  fetchcartItemsFromDb() {
    return this.db.collection(CART_COLLECTION)
    .get()
    .pipe(
      map(querySnapShot => {
        const items: CartItem[] = [];
        querySnapShot.forEach(doc => {
          items.push(this.objTransformer.transformcartItem(doc.data()));
        });
        console.log('Cart Items fetched from db = ', items);
        return items;
      })
    );
  }

  // querySnapShot.forEach(doc => {
  //   products.push(this.objTransformer.transformProductFromDocData(doc.data()));
  // });

  /** cart Operations END */




}
