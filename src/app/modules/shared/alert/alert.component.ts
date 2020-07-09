import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



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
  config: AlertConfig;

  @Input() set Config(config: AlertConfig) { this.config = config; }

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {}

  confirm() {
    this.modal.dismiss('Confirm');
    this.config.controls.confirm.onConfirm();
  }
  
  cancel() {
    this.modal.dismiss('Cancel');
    this.config.controls.cancel.onCancel();
  }
}
