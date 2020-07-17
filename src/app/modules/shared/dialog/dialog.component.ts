import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogConfig } from './dialog.service';


@Component({
  selector: 'app-alert',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  config: DialogConfig;
  @Input() set Config(config: DialogConfig) { this.config = config; }

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
