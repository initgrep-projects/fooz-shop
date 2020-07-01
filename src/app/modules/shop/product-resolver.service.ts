import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Product>{

  constructor(private productService: ProductService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Product | Observable<Product> | Promise<Product> {

    const source = route.queryParamMap.get('source');
    const id = route.paramMap.get('id');
    return this.productService.getProductFromStoreById(id);

  }
}
