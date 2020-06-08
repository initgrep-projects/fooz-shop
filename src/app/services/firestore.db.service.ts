import { Injectable, Query } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FakedataService } from './fakedata.service';
import { Product } from '../models/product';

import { classToPlain, plainToClass } from 'class-transformer';
import { ObjectTransformerService } from './object-transformer.service';
import { map, tap } from 'rxjs/operators';
import { Category } from '../models/category';
import { Size } from '../models/size';
import { Sort } from '../models/Sort';
import { CustomSizeInput } from '../models/custom-size';
import { CartItem } from '../models/cartItem';
import { generateGuid } from '../helpers/util';
import { Image } from '../models/image';
import { User } from '../models/user';

import {
  CART_COLLECTION, PRODUCT_COLLECTION, CATEGORY_COLLECTION,
  SIZE_COLLECTION, CUSTOM_SIZE_INPUT, SORT_COLLECTION, TREND_COLLECTION, PRODUCT_PAGE_SIZE, USER_COLLECTION
} from '../helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class FireStoreDbService {

  lastTimeStamp = 0;
  pageSize = 2;


  private cartCollection: AngularFirestoreCollection<CartItem>;
  private productCollection: AngularFirestoreCollection<Product>;
  private categoryCollection: AngularFirestoreCollection<Category>;
  private sizeCollection: AngularFirestoreCollection<Size>;
  private customSizeInputCollection: AngularFirestoreCollection<CustomSizeInput>;
  private sortCollection: AngularFirestoreCollection<Sort>;
  private trendCollection: AngularFirestoreCollection<Image>;
  private userCollection: AngularFirestoreCollection<User>;

  constructor(
    private db: AngularFirestore,
    private fakedataService: FakedataService,
    private objTransformer: ObjectTransformerService) {

    this.cartCollection = this.db.collection<CartItem>(CART_COLLECTION);
    this.productCollection = this.db.collection<Product>(PRODUCT_COLLECTION);
    this.categoryCollection = this.db.collection<Category>(CATEGORY_COLLECTION);
    this.sizeCollection = this.db.collection<Size>(SIZE_COLLECTION);
    this.customSizeInputCollection = this.db.collection<CustomSizeInput>(CUSTOM_SIZE_INPUT);
    this.sortCollection = this.db.collection<Sort>(SORT_COLLECTION);
    this.trendCollection = this.db.collection<Image>(TREND_COLLECTION);
    this.userCollection = this.db.collection<User>(USER_COLLECTION);
    this.bootstrapTestData();
  }

  private bootstrapTestData() {
    // this.saveProducts();
    // this.saveCategories();
    // this.saveSizes();
    // this.saveCustomSizeInputs();
    // this.saveSortOrders();
    // this.saveTrendItems();
  }



  saveProducts() {
    this.fakedataService.getProducts()
      .forEach(product =>
        this.productCollection.doc(product.Id).set(classToPlain(product)));
  }

  updateProduct(p: Product) {
    this.productCollection.doc(p.Id).set(classToPlain(p));
  }

  /**
   * add a different function for home component to fetch the latest onces only
   */
  fetchProducts(pageSize: number = PRODUCT_PAGE_SIZE) {
    return this.db.collection(PRODUCT_COLLECTION, ref =>
      ref
        .orderBy('timeStamp', 'asc')
        .limit(pageSize)
      // .startAfter(this.lastTimeStamp)
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
      .limit(PRODUCT_PAGE_SIZE)
      // .startAfter(this.lastTimeStamp)
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


  fetchProductById(id: string) {
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
      .forEach(category => this.categoryCollection.doc(generateGuid()).set(classToPlain(category)));
  }

  fetchCategories() {
    return this.categoryCollection
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
      .forEach(size => this.sizeCollection.doc(generateGuid()).set(classToPlain(size)));
  }

  fetchSizes() {
    return this.sizeCollection
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
    this.customSizeInputCollection.doc(generateGuid()).set(classToPlain(customSizeInput));
  }

  fetchCustomSizeInputs() {
    return this.customSizeInputCollection
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
      .forEach(order => this.sortCollection.doc(generateGuid()).set(classToPlain(order)));
  }


  fetchSortOrders() {
    return this.sortCollection
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

  saveTrendItems() {
    this.fakedataService.getTrendItems().forEach(image => {
      this.trendCollection.doc(generateGuid()).set(classToPlain(image));
    });
  }

  fetchTrendItems() {
    return this.trendCollection
      .get()
      .pipe(
        map(querySnapShot => {
          const images: Image[] = [];
          querySnapShot.forEach(doc => {
            images.push(this.objTransformer.transformImageFromDocData(doc.data()));
          });
          return images;
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
    return this.cartCollection.doc(item.Id).set(classToPlain(item));
  }

  updateCartItemToDb(item: CartItem) {
    return this.cartCollection.doc(item.Id).set(classToPlain(item));

  }
  deleteCartItemInDb(id: string) {
    return this.cartCollection.doc(id).delete();
  }

  fetchcartItemsFromDb() {
    return this.cartCollection
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



  /** cart Operations END */


  /** Auth operations START */

  fetchUser(id: string) {
    return this.userCollection.doc(id).get()
      .pipe(
        map(querySnapShot => {
          console.log('querysnapshot data = ', querySnapShot.data());
          return this.objTransformer.transformUserFromDocumentData(querySnapShot.data());
        })
      );
  }

  fetchUserByEmail(email: string) {
    return this.db.collection(USER_COLLECTION, ref =>
      ref.where('email', '==', email)
    )
      .get()
      .pipe(
        map(querySnapShot => {
          console.log('querysnapshot fetchUserByEmail data = ', querySnapShot);
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
    return this.userCollection.doc(user.UID).set(classToPlain(user), { merge: true });
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
  deActivateuser(id: string) {
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
