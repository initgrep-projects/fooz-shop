import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { isEmpty } from 'lodash';


@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(products: Product[], categories: Category[]) {
    console.log('FilterByCategoryPipe = products = ', products);
    console.log('FilterByCategoryPipe categories = ', categories);
    if (isEmpty(products) || isEmpty(categories)) {
      return products;
    }
    return products.filter((p: Product) => this.applyFilter(p, categories));

  }

  private applyFilter(product: Product, categories: Category[]): boolean {
    if (isEmpty(categories)) {
      return true;
    }
    return categories.findIndex(c => c.equals(product.Category)) > -1;
  }

}
