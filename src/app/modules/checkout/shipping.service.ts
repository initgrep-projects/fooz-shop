import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Currency } from 'src/app/models/currency';

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
  shipping(price: Currency) {
    return of(Currency.QAR(price.Amount * this.shippingRate));
  }
}
