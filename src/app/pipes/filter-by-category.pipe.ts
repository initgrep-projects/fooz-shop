import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';
import { Category } from '../models/category';

@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(products: Product[], category: Category) {
    if (!products || !category) {
      return products;
    }

    return products.filter( (p: Product) => this.applyFilter(p, category));

  }

  private applyFilter(product: Product, category: Category) {
    if (!category) {
      return true;
    } else if (product.Category.getCode() === category.getCode()) {
      return true;
    }
    return false;
  }

}
