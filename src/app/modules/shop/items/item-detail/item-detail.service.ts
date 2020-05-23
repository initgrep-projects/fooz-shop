import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';

import { cloneDeep } from 'lodash';
import { Subject, BehaviorSubject } from 'rxjs';
import { Color } from 'src/app/models/color';
import { Size } from 'src/app/models/size';
import { Category } from 'src/app/models/category';
import { CustomSize } from 'src/app/models/custom-size';
import { CartItem } from 'src/app/models/cartItem';
import { isNull } from 'src/app/helpers/util';

export const SZ = 'standard size';
export const CZ = 'custom size';

@Injectable({
  providedIn: 'root'
})
export class ItemDetailService {

  invalidState = [];

  inputProductChange = new BehaviorSubject<Product>(null);
  colorChange = new Subject<Color>();
  sizeChange = new Subject<Size>();
  quantityChange = new BehaviorSubject<number>(0);
  categoryChange = new BehaviorSubject<Category>(null);
  customSizeChange = new BehaviorSubject<CustomSize>(null);
  sizeTypeChange = new Subject<String>();

  constructor() { }

  dispatchProduct(p: Product) {
    this.inputProductChange.next(this.getsanitzedProduct(p));
  }

  setSelectedSize(s: Size) {
    this.sizeChange.next(s);
  }
  setSelectedColors(c: Color) {
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

  validateCartProduct(cartItem: CartItem) {
    let isValid = true;
    this.invalidState = [];
    if (isNull(cartItem.SelectedColor)) {
      isValid = isValid && false;
      this.invalidState.push('Color');
    }
    if (cartItem.SelectedQuantity === 0) {
      isValid = isValid && false;
      this.invalidState.push('Quantity');
    }
    if (isNull(cartItem.SelectedCategory)) {
      isValid = isValid && false;
      this.invalidState.push('Category');
    }
    if (isNull(cartItem.SelectedSize)) {
      console.log('size is null');
      if(!this.isValidCustomSize(cartItem.SelectedCustomSize)){
        console.log('custom size is null');
        isValid = isValid && false;
        this.invalidState.push('Size');
      }
    }
  
    return isValid;
  }

 

  private isValidCustomSize(cz: CustomSize) {
    if (isNull(cz)) { return false; }
    if (!!cz.Width
      && !!cz.Length
      && !!cz.Bust
      && !!cz.Arm
      && !!cz.Hip
    ) { return true; }
    return false;
  }

  private getsanitzedProduct(product: Product) {
    return cloneDeep(product);
   
  }
}
