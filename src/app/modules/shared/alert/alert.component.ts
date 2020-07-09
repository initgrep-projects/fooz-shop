import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertConfig } from './alert.service';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  config: AlertConfig;
  @Input() set Config(config: AlertConfig) { this.config = config; }

  @Output() alertEvent = new EventEmitter<boolean>();

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {}

  confirm() {
    this.modal.dismiss('Confirm');
    this.alertEvent.emit(true);
  }

  cancel() {
    this.modal.dismiss('Cancel');
    this.alertEvent.emit(false);
  }
}
