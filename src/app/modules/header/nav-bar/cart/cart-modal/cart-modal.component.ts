import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CartItemsComponent } from '../cart-items/cart-items.component';
import { Router, NavigationStart } from '@angular/router';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit {

  constructor(private modalService: NgbModal, private router:Router) { }

  modelRef:NgbModalRef;

  ngOnInit(): void {
   this.modelRef =  this.modalService.open(CartItemsComponent, { size: 'lg', scrollable: true });
    this.modelRef.componentInstance.name = "checkoutCartModal";

    this.router.events.pipe(filter((event: any) => event instanceof NavigationStart))
    .subscribe((event: NavigationStart) => {
      this.modelRef.close();
    });
  }

}
