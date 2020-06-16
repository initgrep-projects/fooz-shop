import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthMessages } from 'src/app/util/app.labels';


@Component({
  selector: 'app-anchors',
  templateUrl: './anchors.component.html',
  styleUrls: ['./anchors.component.scss']
})
export class AnchorsComponent implements OnInit {
  labels = AuthMessages.authAnchorLabels;
  @Output('clicked') clicked = new EventEmitter();
  @Input('is-popup') isPopup: boolean = false;

  constructor() { }


  ngOnInit(): void {
  }

  onClick(){
    this.clicked.emit();
  }

}
