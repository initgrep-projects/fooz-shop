import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartModalService {
  modalRef: NgbModalRef;
 

  constructor(
    private modalService: NgbModal,
    private location: Location,
    private router: Router
  ) { }

  /**
   * open a modal as this modal container initializes.
   * Since this component will be triggered on a route,
   * it would result in poping up a modal
   */
  openModal(content: any) {
    this.modalRef = this.modalService.open(content,
      {
        size: 'lg',
        scrollable: true,
        backdrop: true,
        keyboard: true,
        beforeDismiss: () => this.goToPreviousLocation()
      });
  }

  dismissModal() {
    this.modalRef.dismiss();
  }

  closeModal() {
    this.modalRef.close();
  }

  /**
   * callback method to go back to previous location.
   * This is required to clear the modal route.
   */
  private goToPreviousLocation() {
    this.location.back();
    return true;
  }

  /**
   * close the modal incase the route change happens
   * this can happen only using back button since the backdrop prevents using other controls
   */
  closeModalOnRouteChange() {
    return this.router.events
      .pipe(
        tap((event: any) => {
          if (event instanceof NavigationStart) {
            this.closeModal();
          }
        }));
  }

}
