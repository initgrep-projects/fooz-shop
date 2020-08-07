import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  private taxRate: .1;

  constructor() { }

  tax(amount: number) {
    return of(this.taxRate * amount);
  }
}
