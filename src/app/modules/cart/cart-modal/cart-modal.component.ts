import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CartItemsComponent } from '../cart-items/cart-items.component';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit, OnDestroy {

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private location: Location
  ) { }

  modelRef: NgbModalRef;
  private subscription: Subscription;

  ngOnInit(): void {
    this.openModal();
    this.closeModalOnRouteChange();
  }

  /**
   * open a modal as this modal container initializes.
   * Since this component will be triggered on a route,
   * it would result in poping up a modal
   */
  openModal() {
    this.modelRef = this.modalService.open(CartItemsComponent,
      {
        size: 'lg',
        scrollable: true,
        backdrop: true,
        keyboard: true,
        beforeDismiss: ()=> this.goToPreviousLocation()
      });
  }

  /**
   * callback method to go back to previous location.
   * This is required to clear the modal route.
   */
  private goToPreviousLocation(){
    this.location.back();
    return true;
  }

  /**
   * close the modal incase the route change happens
   * this can happen only using back button since the backdrop prevents using other controls
   */
  closeModalOnRouteChange() {
    this.subscription =
      this.router.events.pipe(filter((event: any) => event instanceof NavigationStart))
        .subscribe((event: NavigationStart) => {
          this.modelRef.close();
        });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
