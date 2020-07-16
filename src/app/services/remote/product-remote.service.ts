import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { classToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Category } from '../../models/category';
import { CustomSizeInput } from '../../models/custom-size';
import { Image } from '../../models/image';
import { LookBookItem } from '../../models/lookbook';
import { Product } from '../../models/product';
import { Size } from '../../models/size';
import { Sort } from '../../models/Sort';
import {
  CATEGORY_COLLECTION,
  CUSTOM_SIZE_INPUT,
  LOOKBOOK_COLLECTION, PRODUCT_COLLECTION,
  PRODUCT_PAGE_SIZE, SIZE_COLLECTION, SORT_COLLECTION, TREND_COLLECTION
} from '../../util/app.constants';
import { generateGuid } from '../../util/app.lib';
import { FakedataService } from '../fakedata.service';
import { ObjectTransformerService } from '../object-transformer.service';



@Injectable({
  providedIn: 'root'
})
export class ProductRemoteService {

  lastTimeStamp = 0;
  pageSize = 2;


 
  private productCollection: AngularFirestoreCollection<Product>;
  private categoryCollection: AngularFirestoreCollection<Category>;
  private sizeCollection: AngularFirestoreCollection<Size>;
  private customSizeInputCollection: AngularFirestoreCollection<CustomSizeInput>;
  private sortCollection: AngularFirestoreCollection<Sort>;
  private trendCollection: AngularFirestoreCollection<Image>;
 
  
  private lookBookCollection: AngularFirestoreCollection<LookBookItem>;


  constructor(
    private db: AngularFirestore,
    private fakedataService: FakedataService,
    private objTransformer: ObjectTransformerService) {


    this.productCollection = this.db.collection<Product>(PRODUCT_COLLECTION);
    this.lookBookCollection = this.db.collection<LookBookItem>(LOOKBOOK_COLLECTION);
    this.trendCollection = this.db.collection<Image>(TREND_COLLECTION);
    
    /** To be removed to a different service later
     * after we have a seperate admin dashboard
     */
    this.categoryCollection = this.db.collection<Category>(CATEGORY_COLLECTION);
    this.sizeCollection = this.db.collection<Size>(SIZE_COLLECTION);
    this.customSizeInputCollection = this.db.collection<CustomSizeInput>(CUSTOM_SIZE_INPUT);
    this.sortCollection = this.db.collection<Sort>(SORT_COLLECTION);
    
    this.bootstrapTestData();
  }

  private bootstrapTestData() {
    // this.saveProducts();
    // this.saveCategories();
    // this.saveSizes();
    // this.saveCustomSizeInputs();
    // this.saveSortOrders();
    // this.saveTrendItems(); 
    // this.saveLookBook();
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
  fetchProducts(pageSize: number = PRODUCT_PAGE_SIZE): Observable<Product[]> {
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
   * fetches latest products with a limit of 10
   */
  fetchLatestProducts(): Observable<Product[]> {
    console.log("fetchLatestProducts called");
    return this.db.collection(PRODUCT_COLLECTION, ref =>
      ref
        .orderBy('timeStamp', 'desc')
        .limit(10)
    ).get()
      .pipe(
        map(querySnapShot => {
          const products: Product[] = [];
          querySnapShot.forEach(doc => {
            products.push(this.objTransformer.transformProductFromDocData(doc.data()));
          });
          return products;
        })
      );

  }

  /**
   * fetch more products for pagination
   */
  fetchMoreProducts(): Observable<Product[]> {
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


  fetchProductById(id: string): Observable<Product> {
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

  fetchCategories(): Observable<Category[]> {
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

  fetchSizes(): Observable<Size[]> {
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

  fetchCustomSizeInputs(): Observable<CustomSizeInput> {
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


  fetchSortOrders(): Observable<Sort[]> {
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

  fetchTrendItems(): Observable<Image[]> {
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


  /** Lookbook items */

  saveLookBook() {
    this.fakedataService.getLookBook()
      .forEach(lb => this.lookBookCollection.doc(generateGuid()).set(classToPlain(lb)));
  }

  fetchLookBookItems(): Observable<LookBookItem[]> {
    return this.lookBookCollection
      .get()
      .pipe(
        map(querySnapShot => {
          const items: LookBookItem[] = [];
          querySnapShot.forEach(doc => {
            items.push(this.objTransformer.transformLookBookItem(doc.data()));
          });
          return items;
        })
      );
  }

  /**lookbookitems //end */



}
