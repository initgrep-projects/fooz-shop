import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-address-edit',
  templateUrl: './user-address-edit.component.html',
  styleUrls: ['./user-address-edit.component.scss']
})
export class UserAddressEditComponent implements OnInit {

  addressForm:FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
