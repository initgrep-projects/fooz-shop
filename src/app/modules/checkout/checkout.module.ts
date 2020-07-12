import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { CartViewComponent } from './cart-view/cart-view.component';
import { OrderComponent } from './order/order.component';
import { SharedModule } from '../shared/shared.module';
import { OrderAmountComponent } from './order-amount/order-amount.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { AddressViewComponent } from './address-view/address-view.component';



@NgModule({
  declarations: [CheckoutComponent, CartViewComponent, OrderComponent, OrderAmountComponent, AddressViewComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    FontAwesomeModule,
    SharedModule,
    NgbAccordionModule
  ]
})
export class CheckoutModule { }
