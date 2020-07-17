import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export enum AlertType {
  SUCCESS, WARNING, DANGER
}
export interface AlertConfig {
  type: AlertType
  title: string,
  messages: string[],
  control?: {
    title: string,
    icon: string
  }
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  type = AlertType;
  @Input() config: AlertConfig
  @Output() controlClick = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  controlClicked(){
    this.controlClick.emit(true);
  }

}
