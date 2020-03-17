import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';
import { ShopService } from '../modules/shop/shop.service';
import { HomeService } from '../modules/home/home.service';

const HOME_PAGE = 'home';


@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Product>{

  constructor(private shopService: ShopService,
              private homeservice: HomeService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Product | Observable<Product> | Promise<Product> {
    const source = route.queryParamMap.get('source');
    const id = route.paramMap.get('id');
    if (source === HOME_PAGE) {
      return this.homeservice.getProductFromStoreById(id);
    } else {
      return this.shopService.getProductFromStoreById(id);
    }
  }
}
