import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Address } from 'src/app/models/address';
import { AddressService } from '../address.service';
import { ToastService } from 'src/app/modules/shared/toasts/toast.service';
import { AuthMessages } from 'src/app/util/app.labels';


@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss'],
  animations: [

  ]
})
export class UserAddressComponent implements OnInit {
  labels = AuthMessages;
  @Input() address: Address
  @Input() enableSelect = false;
  @Input() enableDelete = false;
  @Input() enableEdit = false;

  @Output() delete = new EventEmitter<Address>();
  @Output() select = new EventEmitter<Address>();

  constructor(
    private addressService: AddressService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  deleteAddress() {
    this.delete.emit(this.address);
  }

  selectAddress() {
    this.select.emit(this.address);
  }



}
