import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Color } from '../models/color';
import { Currency } from '../models/currency';
import { CustomSize } from '../models/custom-size';
import { Image } from '../models/image';
import { Size } from '../models/size';
import { Sort } from '../models/Sort';
import { Product } from '../models/product';
import { DocumentData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ObjectTransformerService {

  constructor() { }


   transformCategoryFromDocData(param: DocumentData): Category {
    const category = new Category(param.code, param.label);
    if (!!param.icon) {
      category.seticon(param.icon);
    }
    return category;
  }
  
  transformCategory(param: { code: string; label: string; icon: string; }): Category {
    const category = new Category(param.code, param.label);
    if (!!param.icon) {
      category.seticon(param.icon);
    }
    return category;
  }

  transformCategories(params: any[]): Category[] {
    return params.map(param => {
      return this.transformCategory(param);
    });
  }

  transformColor(param: { name: string; code: string; }): Color {
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

  transformSize(param: { label: string; letter: string; }) {
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
      quantity: number;
      timeStamp: number;
      price: { code: string; amount: number; };
      category: { code: string; label: string; icon: string; };
      images: any[]; sizes: any[];
    }) {
      return new Product(
        param.name,
        param.id,
        param.description,
        param.quantity,
        param.timeStamp,
        this.transformCurrency(param.price),
        this.transformCategory(param.category),
        this.transformImages(param.images),
        this.transformSizes(param.sizes)
      );
  }

  public transformProductFromDocData(param: DocumentData) {
      return new Product(
        param.name,
        param.id,
        param.description,
        param.quantity,
        param.timeStamp,
        this.transformCurrency(param.price),
        this.transformCategory(param.category),
        this.transformImages(param.images),
        this.transformSizes(param.sizes)
      );
  }


  transformProducts(params: any[]){
    return params.map(p => this.transformProduct(p));
  }







}
