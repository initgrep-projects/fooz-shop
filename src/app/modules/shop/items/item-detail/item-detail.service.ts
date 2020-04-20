import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';

import { cloneDeep } from 'lodash';
import { Subject, isObservable } from 'rxjs';
import { Color } from 'src/app/models/color';
import { Size } from 'src/app/models/size';
import { Category } from 'src/app/models/category';
import { CustomSize } from 'src/app/models/custom-size';

@Injectable({
  providedIn: 'root'
})
export class ItemDetailService {

  private cartProduct: Product;
  invalidState = [];


  onColorChange = new Subject<Color[]>();
  onSizeChange = new Subject<Size[]>();
  onQuantityChange = new Subject<number>();
  onCategoryChange = new Subject<Category>();
  onCustomSizeChange = new Subject<CustomSize>();

  constructor() { }

  setProduct(product: Product) {
    this.cartProduct = cloneDeep(product);
    this.cartProduct.Sizes = [];
    this.cartProduct.Colors = [];
    this.cartProduct.CustomSize = null;
  }

  getProduct() {
    return this.cartProduct;
  }

  setSelectedSize(sizes: Size[]) {
    const selection = sizes.filter(s => s.isSelected());
    this.cartProduct.Sizes = selection;
    console.log('selected Sizes ', this.cartProduct.Sizes);
    this.onSizeChange.next(selection);
  }

  setSelectedColors(colors: Color[]) {
    const selection = colors.filter(c => c.isSelected());
    this.cartProduct.Colors = selection;
    console.log('selected Colors ', this.cartProduct.Colors);
    this.onColorChange.next(selection);
  }

  setSelectedQuantity(n: number) {
    this.cartProduct.Quantity = n;
    console.log('selectedQuantity ', this.cartProduct.Quantity);
    this.onQuantityChange.next(n);
  }

  setSelectedCategory(c: Category) {
    this.cartProduct.Category = c;
    console.log('category selected ', this.cartProduct.Category);
    this.onCategoryChange.next(c);
  }

  setCustomSize(cz: CustomSize) {
    this.cartProduct.CustomSize = cz;
    console.log('custom size selected = ', this.cartProduct.CustomSize);
    this.onCustomSizeChange.next(cz);
  }


  validateCartProduct() {
    let isValid = true;
    this.invalidState = [];
    if (this.isEmpty(this.cartProduct.Sizes)) {
      isValid = isValid && false;
      this.invalidState.push('Size');
    }
    if (this.isEmpty(this.cartProduct.Colors)) {
      isValid = isValid && false;
      this.invalidState.push('Color');
    }
    if (this.cartProduct.Quantity === 0) {
      isValid = isValid && false;
      this.invalidState.push('Quantity');
    }

    if (this.cartProduct.Category === null) {
      isValid = isValid && false;
      this.invalidState.push('Category');
    }
    if (!this.isValidCustomSize(this.cartProduct.CustomSize)) {
      isValid = isValid && false;
      this.invalidState.push('Custom Size');
    }

    return isValid;
  }

  isEmpty<T>(ts: T[]): boolean {
    return ts.length === 0;
  }

  isValidCustomSize(cz: CustomSize) {
    if ( !cz ) { return true; }
    if (!!cz.getWidth()
      && !!cz.getLength()
      && !!cz.getBust()
      && !!cz.getArm()
      && !!cz.getHip()
      ) { return true; }
    return false;
  }



}
