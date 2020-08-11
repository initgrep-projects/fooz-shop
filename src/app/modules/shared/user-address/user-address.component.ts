import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Address } from 'src/app/models/address';
import { AuthMessages } from 'src/app/util/app.labels';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss'],
  animations: []
})
export class UserAddressComponent implements OnInit {
  labels = AuthMessages;
  @Input() address: Address
  @Input() enableSelect = false;
  @Input() enableDelete = false;
  @Input() enableEdit = false;
  @Input() isSelected = false;
  isClicked = false;

  @Output() edit = new EventEmitter<Address>();
  @Output() delete = new EventEmitter<Address>();
  @Output() select = new EventEmitter<Address>();



  constructor(private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void { }


  editAddress() {
    this.edit.emit(this.address);
    this.router.navigate(['edit', this.address.Id], { relativeTo: this.activeRoute });
  }

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
