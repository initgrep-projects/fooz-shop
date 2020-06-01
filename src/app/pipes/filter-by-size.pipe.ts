import { Pipe, PipeTransform } from '@angular/core';
import { Size } from '../models/size';
import { Product } from '../models/product';
import { isEmpty } from '../helpers/util';

@Pipe({
  name: 'filterBySize'
})
export class FilterBySizePipe implements PipeTransform {


  transform(products: Product[], sizes: Size[]) {
    console.log('FilterBySizePipe = products = ', products);
    console.log('FilterBySizePipe sizes = ', sizes);
    if (isEmpty(products) || isEmpty(sizes)) {
      return products;
    }
    return products.filter((p: Product) => this.applyFilter(p, sizes));
  }

  private applyFilter(product: Product, sizes: Size[]) {
    if (isEmpty(sizes)) {
      return true;
    }
    return this.isSizeAvailable([...product.Sizes], sizes);
  }

  private isSizeAvailable(sizes: Size[], givenSizes: Size[]) {
    const isPresent =  givenSizes.filter(gs => {
      return sizes.find(sz => sz.equals(gs));
    }).length > 0;

    console.log("isSizePresent = ",isPresent);
    return isPresent;
  }

}
