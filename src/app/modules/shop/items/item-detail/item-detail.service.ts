import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';

import { cloneDeep } from 'lodash';
import { Subject, BehaviorSubject } from 'rxjs';
import { Color } from 'src/app/models/color';
import { Size } from 'src/app/models/size';
import { Category } from 'src/app/models/category';
import { CustomSize } from 'src/app/models/custom-size';

@Injectable({
  providedIn: 'root'
})
export class ItemDetailService {

  invalidState = [];
  
  onProductRecieved = new BehaviorSubject<Product>(null);

  onColorChange = new Subject<Color>();
  onSizeChange = new Subject<Size>();
  onQuantityChange = new Subject<number>();
  onCategoryChange = new Subject<Category>();
  onCustomSizeChange = new Subject<CustomSize>();

  constructor() { }

   dispatchProduct(p:Product){
    this.onProductRecieved.next(this.getsanitzedProduct(p));
  }
  
  setSelectedSize(s: Size) {
    this.onSizeChange.next(s);
  }
  
  setSelectedColors(c: Color) {
    this.onColorChange.next(c);
  }
  
  setSelectedQuantity(n: number) {
    this.onQuantityChange.next(n);
  }
  
  setSelectedCategory(c: Category) {
    this.onCategoryChange.next(c);
  }
  
  setCustomSize(cz: CustomSize) {
    this.onCustomSizeChange.next(cz);
  }
  
  validateCartProduct(p: Product, q: number) {
    let isValid = true;
    this.invalidState = [];
  
    if (this.isEmpty(p.Colors)) {
      isValid = isValid && false;
      this.invalidState.push('Color');
    }
    if (q === 0) {
      isValid = isValid && false;
      this.invalidState.push('Quantity');
    }
    
    if (p.Category === null) {
      isValid = isValid && false;
      this.invalidState.push('Category');
    }
    if (this.isEmpty(p.Sizes)) {
      isValid = isValid && false;
      this.invalidState.push('Size');
    }
    // if (!this.isValidCustomSize(p.CustomSize)) {
    //   isValid = isValid && false;
    //   this.invalidState.push('Custom Size');
    // }
    
    return isValid;
  }
  
  private isEmpty<T>(ts: T[]): boolean {
    return ts.length === 0;
  }
  
  private isValidCustomSize(cz: CustomSize) {
    if (!cz) { return true; }
    if (!!cz.getWidth()
    && !!cz.getLength()
    && !!cz.getBust()
    && !!cz.getArm()
    && !!cz.getHip()
    ) { return true; }
    return false;
  }
  
  
  
  private getsanitzedProduct(product: Product) {
   const p = cloneDeep(product);
    p.Sizes = [];
    p.Colors = [];
    p.CustomSize = null;
    console.log("after sanitixation = ", p);
    return p;
  }
}
