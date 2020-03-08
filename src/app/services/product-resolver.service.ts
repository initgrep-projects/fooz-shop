import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';
import { ShopService } from '../modules/shop/shop.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Product>{

  constructor(private shopService: ShopService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Product | Observable<Product> | Promise<Product> {
    const id = route.paramMap.get('id');
    console.log("id in resolver = ", id);
    return this.shopService.getProductFromStoreById(id);
  }
}
