import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Currency } from 'src/app/models/currency';

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  private taxRate = .01;

  constructor() { }

  tax(price: Currency) {
    return of(Currency.QAR(this.taxRate * price.Amount));
  }
}
