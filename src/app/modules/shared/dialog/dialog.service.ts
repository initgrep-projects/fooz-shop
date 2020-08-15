import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ADD_BUTTON, ALERT_TITLE, CANCEL_BUTTON, DUPLICATE_ALERT_MSG, DUPLICATE_ALERT_TITLE, OK_BUTTON, REMOVE_ALERT_MSG, REMOVE_ALERT_TITLE, REMOVE_BUTTON, UPDATE_ALERT_TITLE } from 'src/app/util/app.constants';
import { DialogComponent } from './dialog.component';



export interface DialogConfig {
  title?: string;
  message: string;
  controls?: {
    confirm?: { visible?: boolean, text?: string },
    cancel?: { visible?: boolean, text?: string }
  };
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private modalRef: NgbModalRef;

  constructor(
    private modalService: NgbModal
  ) { }



  confirmRemoval(): Observable<boolean> {
    return this.open({
      title: REMOVE_ALERT_TITLE,
      message: REMOVE_ALERT_MSG,
      controls: {
        confirm: {
          text: REMOVE_BUTTON
        }
      }
    }).pipe(take(1));
  }

  confirmDuplicate(): Observable<boolean> {
    return this.open({
      title: DUPLICATE_ALERT_TITLE,
      message: DUPLICATE_ALERT_MSG,
      controls: {
        confirm: {
          text: ADD_BUTTON
        }
      }
    }).pipe(take(1));
  }

  confirmUpdate(): Observable<boolean> {
    return this.open({
      title: UPDATE_ALERT_TITLE,
      message: DUPLICATE_ALERT_MSG,
      controls: {
        confirm: {
          text: ADD_BUTTON
        }
      }
    }).pipe(take(1));
  }

  alert(msg: string): Observable<boolean> {
    return this.open({
      title: ALERT_TITLE,
      message: msg,
      controls: {
        confirm: {
          text: OK_BUTTON
        }
      }
    }).pipe(take(1));
  }

  private open(content: DialogConfig): Observable<boolean> {
    this.modalRef = this.modalService.open(DialogComponent, { centered: true });
    const instance: DialogComponent = this.modalRef.componentInstance;
    instance.Config = this.initProvidedConfig(content);
    return instance.alertEvent.asObservable();
  }

  private initProvidedConfig(config: DialogConfig): DialogConfig {
    const cfg: DialogConfig = { message: config.message };
    cfg.title = config.title ? config.title : ALERT_TITLE;

    const defaultCancel = { visible: true, text: CANCEL_BUTTON };
    const defaultConfirm = { visible: true, text: OK_BUTTON };
    if (!!config.controls) {
      cfg.controls = {};
      if (!!config.controls.confirm) {
        const $confirm = config.controls.confirm;
        cfg.controls.confirm = {
          visible: $confirm.visible === false ? false : true,
          text: !!$confirm.text ? $confirm.text : OK_BUTTON,
        };
      } else {
        cfg.controls.confirm = defaultConfirm;
      }

      if (!!config.controls.cancel) {
        const $cancel = config.controls.cancel;
        cfg.controls.cancel = {
          visible: $cancel.visible === false ? false : true,
          text: !!$cancel.text ? $cancel.text : CANCEL_BUTTON
        };
      } else {
        cfg.controls.cancel = defaultCancel;
      }
    } else {
      cfg.controls = {
        confirm: defaultConfirm,
        cancel: defaultCancel
      };
    }

    return { ...cfg };
  }




}
