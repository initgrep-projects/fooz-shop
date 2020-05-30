import { Injectable, ComponentFactoryResolver, Injector, Inject, ApplicationRef, TemplateRef, Type } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent, AlertConfig } from './alert.component';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private modalService: NgbModal
  ) { }

  open(content: AlertConfig) {
    const instance: AlertComponent = this.modalService.open(AlertComponent).componentInstance;
    console.log('instance of AlertComponent = ', instance);
    instance.config = content;
    instance.initProvidedConfig();

  }




}
