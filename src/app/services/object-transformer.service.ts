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
import { CartItem } from '../models/cart-item';
import { User } from '../models/user';
import { Address } from '../models/address';
import { LookBookItem } from '../models/lookbook';
import { Brand } from '../models/brand';
import { Payment } from '../models/payment.model';
import { OrderStatus } from '../models/order-status.model';
import { OrderItem } from '../models/order-item.modal';

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
    if (!param) { return null; }
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
    if (!param) { return null; }
    return new CustomSize(param.width, param.length, param.bust, param.arm, param.hip);
  }

  transformCustomSizes(params: any[]) {
    return params.map(cz => this.transformCustomSize(cz));
  }

  transformImage(param: { url: string; color: { name: string; code: string; }; }) {
    return new Image(param.url, this.transformColor(param.color));
  }

  transformImageFromDocData(param: DocumentData) {
    return new Image(param.url, this.transformColor(param.color));
  }

  transformImages(params: any[]) {
    return params.map(p => this.transformImage(p));
  }

  transformCustomSizeInput<T extends DocumentData>(param: T) {
    return new CustomSizeInput(param.width, param.length, param.bust, param.arm, param.hip);
  }

  transformSize(param: { label: string; letter: string; selected?: boolean }) {
    if (!param) { return null; }
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
      quantity: number;
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
      + param.quantity,
      param.timeStamp,
      this.transformCurrency(param.price),
      this.transformCategory(param.category),
      this.transformImages(param.images),
      this.transformSizes(param.sizes),
    );
    product.Colors = this.transformColors(param.colors);
    return product;
  }

  public transformProductFromDocData(param: DocumentData): Product {
    const product = new Product(
      param.name,
      param.id,
      param.description,
      +param.quantity,
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
    return new CartItem(
      param.id,
      param.createdDate,
      param.userId,
      param.isAnonymousUser,
      this.transformProduct(param.product),
      param.selectedQuantity,
      this.transformColor(param.selectedColor),
      this.transformSize(param.selectedSize),
      this.transformCustomSize(param.selectedCustomSize),
      this.transformCategory(param.selectedCategory),
      param.stage
    );
  }

  transformCartItems(params: any[]) {
    return params.map(this.transformcartItem);
  }


  transformUser(user: firebase.User): User {
    if (!user) {
      return null;
    }
    return new User(user.uid, user.email, user.displayName, user.emailVerified,
      user.phoneNumber, user.isAnonymous, user.photoURL);
  }

  transformUserFromDocumentData(user: DocumentData) {
    if (!user) {
      return null;
    }
    return new User(user.uid, user.email, user.name, user.isEmailVerified,
      user.phoneNumber, user.isAnonymous, user.photoURL, user.roles);
  }

  transformAddressFromDocumentData(param: DocumentData): Address {
    if (!param) {
      return null;
    }
    return new Address(param.id, param.userId, param.name, param.phone,
      param.street, param.country, param.state, param.city, param.zipcode, param.isSelected, param.createdDate);
  }

  /** use to for saving data from ui to db */
  transformAddress(param: {
    id: string,
    userId: string, city: string, country: string,
    name: string, phone: string, state: string,
    street: string, zipcode: string, isSelected: boolean
  }) {
    if (!param) {
      return null;
    }
    return new Address(param.id, param.userId, param.name, param.phone,
      param.street, param.country, param.state, param.city, param.zipcode, param.isSelected);
  }


  transformLookBookItem(param: DocumentData) {
    return !param ? null : new LookBookItem(this.transformImage(param.image), param.label, param.description);
  }

  transformBrand(param: DocumentData) {
    return !param
      ? null
      : new Brand(param.name, param.logo, param.country, param.phones, param.emails, param.instagram, param.facebook, param.twitter, param.pinterest);
  }


  transformPayment(param: DocumentData) {
    return !param
      ? null
      : new Payment(param.id, this.transformCurrency(param.amount), param.type, param.createdOn);
  }

  transformOrderStatus(param: DocumentData) {
    return !param
      ? null
      : new OrderStatus(param.id, param.stage, param.createdOn, param.shippingId);
  }

  transformOrderItem(param: DocumentData) {
    return !param
      ? null
      : new OrderItem(param.id, param.userId, param.cartItemIds, param.addressId, param.statusIds, param.paymentId);
  }

}
