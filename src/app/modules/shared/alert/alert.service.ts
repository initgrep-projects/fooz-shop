import { Injectable, ComponentFactoryResolver, Injector, Inject, ApplicationRef, TemplateRef, Type } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent, AlertConfig } from './alert.component';


@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private modalRef: NgbModalRef;

  constructor(
    private modalService: NgbModal
  ) { }

  open(content: AlertConfig) {
    this.modalRef = this.modalService.open(AlertComponent,{
      centered: true
    });
    const instance: AlertComponent = this.modalRef.componentInstance;
    instance.config = content;
    instance.initProvidedConfig();
  }
  close(){
    this.modalRef.dismiss('dismissed');
  }




}
