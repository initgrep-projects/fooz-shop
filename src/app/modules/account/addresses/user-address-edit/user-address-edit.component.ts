import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import { Observable, of } from 'rxjs';
import { catchError, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { fadeIn } from 'src/app/animations/fadeAnimation';
import { Address } from 'src/app/models/address';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { GeoAddressService } from 'src/app/services/geo-address.service';
import { ObjectTransformerService } from 'src/app/services/object-transformer.service';
import { AuthMessages } from 'src/app/util/app.labels';
import { generateGuid, isMatched } from 'src/app/util/app.lib';
import { SubSink } from 'subsink';
import { AddressService } from '../address.service';
import { Location } from '@angular/common';




@Component({
  selector: 'app-user-address-edit',
  templateUrl: './user-address-edit.component.html',
  styleUrls: ['./user-address-edit.component.scss'],
  animations: [fadeIn]
})
export class UserAddressEditComponent implements OnInit, OnDestroy {
  labels = AuthMessages;
  addressForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.max(100)]],
    phone: ['', [Validators.required, Validators.pattern('^[+]?[0-9]{12}')]],
    street: ['', Validators.required],
    country: ['', Validators.required],
    state: ['', Validators.required],
    city: ['', Validators.required],
    zipcode: ['', [Validators.required, Validators.pattern('^[0-9]{5,12}$')]],
    isSelected: [false]

  });


  searchingCtr = false;
  searchCtrFailed = false;
  searchingState = false;
  searchStateFailed = false;
  searchingCity = false;
  searchCityFailed = false;
  saveProgress = false;

  authUser: User;
  address: Address;
  isUpdateMode = false;

  private subs = new SubSink();


  constructor(
    private formBuilder: FormBuilder,
    private geoAdressService: GeoAddressService,
    private authService: AuthService,
    private addressService: AddressService,
    private objTransformService: ObjectTransformerService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.subs.sink =
      this.authService.userFromStore$.subscribe(user => {
        if (!!user) {
          this.authUser = cloneDeep(user);
          this.patchAddressUser(this.authUser);
        }
      });

    this.subs.sink =
      this.activatedRoute.data.subscribe(data => {
        if (!!data.address) {
          this.address = cloneDeep(data.address);
          this.isUpdateMode = true;
          this.patchAddressOnUpdate(this.address)
        }
      });

  }

  patchAddressUser(user: User) {
    this.addressForm.patchValue({
      name: user.Name,
      phone: user.PhoneNumber,
      isSelected: false
    });
  }

  patchAddressOnUpdate(address: Address) {
    this.addressForm.patchValue({
      name: address.Name,
      phone: address.Phone,
      street: address.Street,
      country: address.Country,
      state: address.State,
      city: address.City,
      zipcode: address.ZipCode,
      isSelected: address.IsSelected
    });
  }


  submit() {
    console.log('updateMode = ', this.isUpdateMode);
    if (this.isUpdateMode) {
      this.updateAddress();
    } else {
      this.saveAddress();
    }
  }

  saveAddress() {
    this.saveProgress = true;
    console.log('save address = ',this.addressForm.value);
    const address = this.objTransformService.transformAddress(this.addressForm.value);
    address.UserId = this.authUser.UID;
    address.Id = generateGuid();

    this.subs.sink = this.addressService.saveAddress(address)
      .subscribe(isSuccess => {
        this.saveProgress = false;
        this.location.back();
      });
  }

  updateAddress() {
    this.saveProgress = true;
    console.log('update address = ',this.addressForm.value);
    const updatedAddress = this.objTransformService.transformAddress(this.addressForm.value);
    updatedAddress.Id = this.address.Id;
    updatedAddress.CreatedDate = this.address.CreatedDate;
    updatedAddress.UserId = this.address.UserId;
    this.subs.sink = this.addressService.updateAddress(updatedAddress)
      .subscribe((issuccess) => {
        this.location.back();
        this.saveProgress = false;
      });
  }


  findCountry = (text$: Observable<string>) => {
    return text$.pipe(
      // debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searchingCtr = true),
      switchMap(term => {
        return this.addressService.countries$
          .pipe(
            map(countries => countries
              .filter(c => isMatched(c.country_name, term))
              .map(c => c.country_name)),
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

  findState = (text$: Observable<string>) => {
    return text$.pipe(
      // debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searchingState = true),
      switchMap(term => {
        return this.geoAdressService.searchState(this.addressForm.value.country, term)
          .pipe(
            tap(() => {
              this.searchStateFailed = false;
              this.searchingState = false;
            }),
            catchError((e) => {
              this.searchStateFailed = true;
              this.searchingState = false;
              return of([]);
            })
          )
      })
    )
  }

  findCity = (text$: Observable<string>) => {
    return text$.pipe(
      // debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searchingCity = true),
      switchMap(term => {
        return this.geoAdressService.searchCity(this.addressForm.value.state, term)
          .pipe(
            tap(() => {
              this.searchCityFailed = false;
              this.searchingCity = false;
            }),
            catchError((e) => {
              this.searchCityFailed = true;
              this.searchingCity = false;
              return of([]);
            })
          )
      })
    )
  }

  routeToAddresses() {
    this.router.navigate(['my/account/addresses']);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
