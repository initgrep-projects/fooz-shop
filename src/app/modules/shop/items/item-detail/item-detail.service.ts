import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';

import { cloneDeep } from 'lodash';
import { Subject, BehaviorSubject } from 'rxjs';
import { Color } from 'src/app/models/color';
import { Size } from 'src/app/models/size';
import { Category } from 'src/app/models/category';
import { CustomSize } from 'src/app/models/custom-size';

export const SZ = 'standard size';
export const CZ = 'custom size';

@Injectable({
  providedIn: 'root'
})
export class ItemDetailService {



  invalidState = [];

  inputProductChange = new BehaviorSubject<Product>(null);
  colorChange = new Subject<Color[]>();
  sizeChange = new Subject<Size[]>();
  quantityChange = new Subject<number>();
  categoryChange = new Subject<Category>();
  customSizeChange = new Subject<CustomSize>();
  sizeTypeChange = new Subject<String>();

  constructor() { }

  dispatchProduct(p: Product) {
    this.inputProductChange.next(this.getsanitzedProduct(p));
  }

  setSelectedSize(s: Size[]) {
    this.sizeChange.next(s);
  }
  setSelectedColors(c: Color[]) {
    this.colorChange.next(c);
  }
  setSelectedQuantity(n: number) {
    this.quantityChange.next(n);
  }
  setSelectedCategory(c: Category) {
    this.categoryChange.next(c);
  }
  setCustomSize(customSize: CustomSize) {
    this.customSizeChange.next(customSize);
  }

  setStandardSizeType() {
    this.sizeTypeChange.next(SZ);
  }
  setCustomSizeType() {
    this.sizeTypeChange.next(CZ);
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
      console.log('size is null');
      if(!this.isValidCustomSize(p.CustomSize)){
        console.log('custom size is null');
        isValid = isValid && false;
        this.invalidState.push('Size');
      }
    }
  
    return isValid;
  }

  private isEmpty<T>(ts: T[]): boolean {
    return ts.length === 0;
  }

  private isValidCustomSize(cz: CustomSize) {
    if (!cz) { return false; }
    if (!!cz.Width
      && !!cz.Length
      && !!cz.Bust
      && !!cz.Arm
      && !!cz.Hip
    ) { return true; }
    return false;
  }

  private getsanitzedProduct(product: Product) {
    const p = cloneDeep(product);
    p.Sizes = [];
    p.Colors = [];
    p.CustomSize = null;
    console.log('after sanitixation = ', p);
    return p;
  }
}
