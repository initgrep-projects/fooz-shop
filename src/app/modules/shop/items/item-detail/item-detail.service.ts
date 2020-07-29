import { Injectable } from '@angular/core';
import { cloneDeep, isNull, isUndefined } from 'lodash';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item';
import { Category } from 'src/app/models/category';
import { Color } from 'src/app/models/color';
import { CustomSize } from 'src/app/models/custom-size';
import { Product } from 'src/app/models/product';
import { Size } from 'src/app/models/size';


export const SZ = 'standard size';
export const CZ = 'custom size';

export interface invalidStateType {
  color: boolean,
  size: boolean,
  quantity: boolean,
  category: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ItemDetailService {

  invalidState: invalidStateType;

  inputProductChange = new BehaviorSubject<Product>(null);
  colorChange = new Subject<Color>();
  sizeChange = new Subject<Size>();
  quantityChange = new BehaviorSubject<number>(1);
  categoryChange = new BehaviorSubject<Category>(null);
  customSizeChange = new BehaviorSubject<CustomSize>(null);
  sizeTypeChange = new Subject<String>();

  constructor() {
    this.invalidState = { color: true, category: true, quantity: true, size: true };
  }


  dispatchProduct(p: Product) {
    console.log('new product dispatched => ',p);
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

  validateCartItem(cartItem: CartItem) {
    let isValid = true;
    if (isNull(cartItem.SelectedColor) || isUndefined(cartItem.SelectedColor)) {
      isValid = isValid && false;
      this.invalidState.color = false;
    } else {
      isValid = isValid && true;
      this.invalidState.color = true;
    }
    if (cartItem.SelectedQuantity === 0) {
      isValid = isValid && false;
      this.invalidState.quantity = false;
    } else {
      isValid = isValid && true;
      this.invalidState.quantity = true;
    }
    if (isNull(cartItem.SelectedCategory) || isUndefined(cartItem.SelectedCategory)) {
      isValid = isValid && false;
      this.invalidState.category = false;
    } else {
      isValid = isValid && true;
      this.invalidState.category = true;
    }

    if (isNull(cartItem.SelectedSize) || isUndefined(cartItem.SelectedSize)) {
      console.log('size is null');
      if (!this.isValidCustomSize(cartItem.SelectedCustomSize)) {
        console.log('custom size is null');
        isValid = isValid && false;
        this.invalidState.size = false;
      } else {
        isValid = isValid && true;
        this.invalidState.size = true;
      }
    } else {
      isValid = isValid && true;
      this.invalidState.size = true;
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
