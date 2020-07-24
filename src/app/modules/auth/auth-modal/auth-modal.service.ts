import { Injectable } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationStart } from '@angular/router';
import { Location } from '@angular/common';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthModalService {

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
        backdrop: true,
        keyboard: true,
        centered: true,
        beforeDismiss: () => this.goToPreviousLocation()
      });
  }

  dismissModal() {
    this.modalRef.dismiss();
  }

  closeModal() {
    this.modalRef.dismiss();
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
