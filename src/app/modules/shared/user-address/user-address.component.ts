import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Address } from 'src/app/models/address';
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
  @Input() isSelected = false;
  isClicked = false;

  @Output() delete = new EventEmitter<Address>();
  @Output() select = new EventEmitter<Address>();



  constructor() { }

  ngOnInit(): void { }



  deleteAddress() {
    this.delete.emit(this.address);
  }

  clicked() {
    this.isClicked = !this.isClicked;
    this.selectAddress();
  }

  private selectAddress() {
    if (this.enableSelect) {
      if (!this.isSelected) {
        this.isSelected = true;
        this.select.emit(this.address);
      }
    }
  }



}
