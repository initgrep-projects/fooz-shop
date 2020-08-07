import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RouteManagementService } from '../../main/route-management.service';

@Injectable({
  providedIn: 'root'
})
export class AuthModalService {

  modalRef: NgbModalRef;
  previousUrl: string;

  constructor(
    private modalService: NgbModal,
    private routeMgmtService: RouteManagementService
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
        centered: false,
        beforeDismiss: () => {
          this.routeMgmtService.resetAuthOutlet();
          return true;
        }
      });
  }

  dismissModal() {
    this.modalRef.dismiss();
  }

  closeModal() {
    this.modalRef.close();
  }

}
