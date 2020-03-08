import { Pipe, PipeTransform } from '@angular/core';
import { Size } from '../models/size';
import { Product } from '../models/product';

@Pipe({
  name: 'filterBySize'
})
export class FilterBySizePipe implements PipeTransform {


  transform(products: Product[], size: Size) {
    if (!products || !size) {
      return products;
    }
    return products.filter((p: Product) => this.applyFilter(p, size));
  }

  private applyFilter(product: Product, size: Size) {
    if (!size) {
      return true;
    } else if (this.isSizeAvailable(product.sizes, size)) {
      return true;
    }
    return false;

  }

  private isSizeAvailable(sizes: Size[], givenSize: Size) {
    console.log('isSize Available - ', sizes, givenSize.getLetter());
    return  sizes.findIndex((s) => s.getLetter() === givenSize.getLetter()) > -1;
  }

}
