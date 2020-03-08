import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';
import { Sort } from '../models/Sort';

const ASCENDING = 'ASC';
const DESCENDING = 'DSC';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(products: Product[], sortOrder: Sort) {
    if (!products || !sortOrder) {
      return products;
    }
    return this.sortByorder(products, sortOrder);
  }


  private sortByorder(products: Product[], sortOrder: Sort) {
    if (sortOrder.getType() === ASCENDING) {
      return this.ascendingOrder(products);
    } else if (sortOrder.getType() === DESCENDING) {
      return this.descendingOrder(products);
    }
  }

  private descendingOrder(products: Product[]) {
    return products.sort((first, last) => {
      return first.price.getAmount() - last.price.getAmount();
    });
  }

  private ascendingOrder(products: Product[]) {
    return products.sort((first, last) => {
      return last.price.getAmount() - first.price.getAmount();
    });
  }

}
