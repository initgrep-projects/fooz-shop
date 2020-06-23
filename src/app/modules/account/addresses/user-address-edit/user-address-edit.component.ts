import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthMessages } from 'src/app/util/app.labels';
import { GeoAddressService, Country } from 'src/app/services/geo-address.service';
import { Observable, of, throwError } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, map, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { User } from 'src/app/models/user';
import { SubSink } from 'subsink';
import { AddressService } from '../address.service';
import { Address } from 'src/app/models/address';
import { ObjectTransformerService } from 'src/app/services/object-transformer.service';
import { generateGuid } from 'src/app/util/app.lib';
import { ToastService, toastType } from 'src/app/modules/shared/toasts/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { cloneDeep } from 'lodash';




@Component({
  selector: 'app-user-address-edit',
  templateUrl: './user-address-edit.component.html',
  styleUrls: ['./user-address-edit.component.scss']
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
    zipcode: ['', Validators.required]

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
    private toastService: ToastService,
    private router: Router,
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
      phone: user.PhoneNumber
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
      zipcode: address.ZipCode
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
    const address = this.objTransformService.transformAddress(this.addressForm.value);
    address.UserId = this.authUser.UID;
    address.Id = generateGuid();
    this.addressService.saveAddress(address)
      .then(() => {
        this.toastService.show(this.labels.addressAddSuccess, { type: toastType.SUCCESS });
        this.routeToAddresses();
      })
      .catch((e) => this.toastService.show(this.labels.addressAddFailed, { type: toastType.ERROR }))
      .finally(() => this.saveProgress = false);
  }


  updateAddress() {
    this.saveProgress = true;
    console.log('form value ', this.addressForm.value);
    console.log('post address', this.address);
    const updatedAddress = this.objTransformService.transformAddress(this.addressForm.value);
    updatedAddress.Id = this.address.Id;
    updatedAddress.CreatedDate = this.address.CreatedDate;
    updatedAddress.UserId = this.address.UserId;
    console.log('updated address = ', updatedAddress);
    this.addressService.updateAddress(updatedAddress)
      .then(() => {
        this.toastService.show(this.labels.addressUpdateSuccess, { type: toastType.SUCCESS });
        this.routeToAddresses();
      })
      .catch((e) => this.toastService.show(this.labels.addressUpdateFailed, { type: toastType.ERROR }))
      .finally(() => this.saveProgress = false);
  }


  findCountry = (text$: Observable<string>) => {
    return text$.pipe(
      // debounceTime(300),
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
