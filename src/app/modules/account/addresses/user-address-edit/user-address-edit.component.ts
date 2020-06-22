import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthMessages } from 'src/app/util/app.labels';
import { GeoAddressService, Country } from 'src/app/services/geo-address.service';
import { Observable, of, throwError } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, map, catchError } from 'rxjs/operators';




@Component({
  selector: 'app-user-address-edit',
  templateUrl: './user-address-edit.component.html',
  styleUrls: ['./user-address-edit.component.scss']
})
export class UserAddressEditComponent implements OnInit {
  labels = AuthMessages;
  addressForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.max(100)]],
    phone: ['', [Validators.required, Validators.pattern(new RegExp("[0-9 ]{12}"))]],
    street: ['', Validators.required],
    country: ['', Validators.required],
    state: ['', Validators.required],
    city: ['', Validators.required],
    zipcode: ['', Validators.required]

  });

  countries: Country[] = [];
  searchingCtr = false;
  searchCtrFailed = false;


  constructor(
    private formBuilder: FormBuilder,
    private geoAdressService: GeoAddressService) { }


  ngOnInit(): void {
   
  }

  saveAddress() {
    console.log("saveAddress called ", this.addressForm.value);
  }

  findCountry = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searchingCtr = true),
      switchMap(term => {
        return this.geoAdressService.searchCountry(term)
          .pipe(
            tap(() => {
              this.searchCtrFailed = false;
              this.searchingCtr = false;
            }),
            catchError((e) => {
              this.searchCtrFailed = true;
              this.searchingCtr = false;
              return of([]);
            })
          )  
      })
    )
  }


}
