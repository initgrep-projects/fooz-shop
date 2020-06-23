import { Component, OnInit, Input } from '@angular/core';
import { Address } from 'src/app/models/address';
import { AddressService } from '../address.service';
import { ToastService, toastType } from 'src/app/modules/shared/toasts/toast.service';
import { AuthMessages } from 'src/app/util/app.labels';


@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss']
})
export class UserAddressComponent implements OnInit {
  labels = AuthMessages;
  @Input() address:Address
  constructor(
    private addressService: AddressService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  removeAddress(){
    this.addressService.removeAddress(this.address.Id)
    .then(()=> this.toastService.show(this.labels.addressRemoveSuccess))
    .catch(error => this.toastService.show(this.labels.addressRemoveFailed, {type:toastType.ERROR}));
  }

 

}
