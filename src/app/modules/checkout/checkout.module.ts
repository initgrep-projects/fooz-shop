import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
import { AddressViewComponent } from './address-view/address-view.component';
import { CartViewComponent } from './cart-view/cart-view.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutTotalComponent } from './checkout-total/checkout-total.component';
import { CouponListComponent } from './checkout-total/coupon-list/coupon-list.component';
import { CheckoutComponent } from './checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { CheckoutEffects } from './store/checkout.effects';
import { CartAmountComponent } from './checkout-total/cart-amount/cart-amount.component';



@NgModule({
  declarations: [
    CheckoutComponent,
    CartViewComponent,
    CartAmountComponent,
    AddressViewComponent,
    PaymentComponent,
    CheckoutTotalComponent,
    CouponListComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    FontAwesomeModule,
    SharedModule,
    HttpClientModule,
    EffectsModule.forFeature([CheckoutEffects])
  ]
})
export class CheckoutModule { }
