import { Component, OnInit, TemplateRef, ViewChild, Input, AfterContentInit, AfterViewInit, ViewContainerRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OK_BUTTON, CANCEL_BUTTON, ALERT_TITLE } from 'src/app/helpers/constants';



export interface AlertConfig {
  title?: string;
  message: string;
  controls?: {
    confirm?: { visible?: boolean, text?: string, onConfirm?: () => void },
    cancel?: { visible?: boolean, text?: string, onCancel?: () => void }
  };
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() config: AlertConfig;

  constructor(
    public modal: NgbActiveModal) { }


  ngOnInit(): void {

  }

  initProvidedConfig() {
    const cfg: AlertConfig = { message: this.config.message };
    cfg.title = !!this.config.title ? this.config.title : ALERT_TITLE;

    const defaultCancel = { visible: true, text: CANCEL_BUTTON, onCancel: () => { } };
    const defaultConfirm = { visible: true, text: OK_BUTTON, onConfirm: () => { } };
    if (!!this.config.controls) {
      cfg.controls = {};
      if (!!this.config.controls.confirm) {
        const $confirm = this.config.controls.confirm;
        cfg.controls.confirm = {
          visible: $confirm.visible ? true : false,
          text: !!$confirm.text ? $confirm.text : OK_BUTTON,
          onConfirm: !!$confirm.onConfirm && typeof $confirm.onConfirm === 'function' ? $confirm.onConfirm : () => { }
        };
      } else {
        cfg.controls.confirm = defaultConfirm;
      }

      if (!!this.config.controls.cancel) {
        const $cancel = this.config.controls.cancel;
        cfg.controls.cancel = {
          visible: $cancel.visible ? true : false,
          text: !!$cancel.text ? $cancel.text : CANCEL_BUTTON,
          onCancel: !!$cancel.onCancel && typeof $cancel.onCancel === 'function' ? $cancel.onCancel : () => { }
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

    this.config = { ...cfg };
  }

  confirm() {
    this.modal.dismiss('Confirm');
    this.config.controls.confirm.onConfirm();
  }
  cancel() {
    this.modal.dismiss('Cancel');
    this.config.controls.cancel.onCancel();
  }
}
