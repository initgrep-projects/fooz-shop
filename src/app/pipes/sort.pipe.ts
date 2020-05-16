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
    if (sortOrder.Type === ASCENDING) {
      return this.ascendingOrder(products);
    } else if (sortOrder.Type === DESCENDING) {
      return this.descendingOrder(products);
    }
  }

  private descendingOrder(products: Product[]) {
    return products.sort((first, last) => {
      return first.Price.Amount - last.Price.Amount;
    });
  }

  private ascendingOrder(products: Product[]) {
    return products.sort((first, last) => {
      return last.Price.Amount - first.Price.Amount;
    });
  }

}
