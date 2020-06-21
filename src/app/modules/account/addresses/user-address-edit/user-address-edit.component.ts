import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-address-edit',
  templateUrl: './user-address-edit.component.html',
  styleUrls: ['./user-address-edit.component.scss']
})
export class UserAddressEditComponent implements OnInit {
  addressForm = this.formBuilder.group({
    name: [''],
    phone: [''],
    address: this.formBuilder.group({
      street: [''],
      country: [''],
      state: [''],
      city: [''],
      zipcode: ['560076']
    })
  });

  constructor(private formBuilder: FormBuilder) { }


  ngOnInit(): void {



  }



}
