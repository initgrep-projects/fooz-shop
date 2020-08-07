import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  private shippingRate = 0;

  constructor() { }

  /**
   *  should contain, amount, intems, approx weight and dimensions
   * @param amount 
   */
  shipping(amount) {
    return of(amount * this.shippingRate);
  }
}
