import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartModalService } from './cart-modal.service';
import { SubSink } from 'subsink';
import { CartItemsComponent } from '../cart-items/cart-items.component';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit, OnDestroy {

  constructor(
    private cartModelService: CartModalService
  ) { }

  private subs = new SubSink();

  ngOnInit(): void {
    /** to avoid circular ref between cartModelservice vs cartItemsComponent */
    this.cartModelService.openModal(CartItemsComponent);
    this.subs.sink = this.cartModelService.closeModalOnRouteChange().subscribe();
  }

   ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
