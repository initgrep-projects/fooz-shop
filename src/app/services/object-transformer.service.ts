import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Color } from '../models/color';
import { Currency } from '../models/currency';
import { CustomSize, CustomSizeInput } from '../models/custom-size';
import { Image } from '../models/image';
import { Size } from '../models/size';
import { Sort } from '../models/Sort';
import { Product } from '../models/product';
import { DocumentData } from '@angular/fire/firestore';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class ObjectTransformerService {

  constructor() { }


  transformCategoryFromDocData(param: DocumentData): Category {
    const category = new Category(param.code, param.label);
    if (!!param.icon) {
      category.Icon = param.icon;
    }
    return category;
  }

  transformCategory(param: { code: string; label: string; icon: string; }): Category {
    const category = new Category(param.code, param.label);
    if (!!param.icon) {
      category.Icon = param.icon;
    }
    return category;
  }

  transformCategories(params: any[]): Category[] {
    return params.map(param => {
      return this.transformCategory(param);
    });
  }

  transformColor(param: { name: string; code: string; selected?: boolean }): Color {
    if (param.selected) {
      return new Color(param.name, param.code, param.selected);
    }
    return new Color(param.name, param.code);
  }

  transformColors(params: any[]) {
    return params.map(p => this.transformColor(p));
  }

  transformCurrency(param: { code: string; amount: number; }) {
    return new Currency(param.code, param.amount);
  }

  transformCurrencies(params: any[]) {
    return params.map(p => this.transformCurrency(p));
  }

  transformCustomSize(param: { width: number; length: number; bust: number; arm: number; hip: number; }) {
    if(!param) return null;
    return new CustomSize(param.width, param.length, param.bust, param.arm, param.hip);
  }

  transformCustomSizes(params: any[]) {
    return params.map(cz => this.transformCustomSize(cz));
  }

  transformImage(param: { url: string; color: { name: string; code: string; }; }) {
    return new Image(param.url, this.transformColor(param.color));
  }

  transformImages(params: any[]) {
    return params.map(p => this.transformImage(p));
  }

  transformCustomSizeInput<T extends DocumentData>(param: T) {
    return new CustomSizeInput(param.width, param.length, param.bust, param.arm, param.hip);
  }

  transformSize(param: { label: string; letter: string; selected?: boolean }) {
    if (param.selected) {
      return new Size(param.label, param.letter, param.selected);
    }
    return new Size(param.label, param.letter);
  }

  transformSizeFromDocData(param: DocumentData) {
    return new Size(param.label, param.letter);
  }

  transformSizes(params: any[]) {
    return params.map(p => this.transformSize(p));
  }

  transformSort(param: { type: string; label: string; icon: string; }) {
    return new Sort(param.type, param.label, param.icon);
  }

  transformSortFromDocData(param: DocumentData) {
    return new Sort(param.type, param.label, param.icon);
  }

  transformSorts(params: any[]) {
    return params.map(p => this.transformSort(p));
  }

  public transformProduct(param:
    {
      name: string;
      id: string;
      description: string;
      availableQuantity: number;
      timeStamp: number;
      price: { code: string; amount: number; };
      category: { code: string; label: string; icon: string; };
      images: any[];
      sizes: any[];
      colors: any[];
    }): Product {


    const product = new Product(
      param.name,
      param.id,
      param.description,
      param.availableQuantity,
      param.timeStamp,
      this.transformCurrency(param.price),
      this.transformCategory(param.category),
      this.transformImages(param.images),
      this.transformSizes(param.sizes),
    );
    product.Colors = this.transformColors(param.colors);
    console.log('transformProduct after = ', product);
    return product;
  }

  public transformProductFromDocData(param: DocumentData): Product {
    const product = new Product(
      param.name,
      param.id,
      param.description,
      param.availableQuantity,
      param.timeStamp,
      this.transformCurrency(param.price),
      this.transformCategory(param.category),
      this.transformImages(param.images),
      this.transformSizes(param.sizes)
    );

    product.Colors = this.transformColors(param.colors);
    return product;
  }


  transformProducts(params: any[]) {
    return params.map(p => this.transformProduct(p));
  }

  transformcartItem(param: DocumentData) {
    console.log("param = ", param);
    return new CartItem(
      param.id,
      param.userId,
      this.transformProduct(param.product),
      param.selectedQuantity,
      this.transformColor(param.selectedColor),
      this.transformSize(param.selectedSize),
      this.transformCustomSize(param.selectedCustomSize),
      this.transformCategory(param.selectedCategory)

    );
  }

  transformCartItems(params: any[]) {
    return params.map(this.transformcartItem);
  }





}
