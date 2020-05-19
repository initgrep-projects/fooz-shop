import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Size } from 'src/app/models/size';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent implements OnInit {

  @Input() sizes: Size[];
  @Output() SelectionChange = new EventEmitter<Size>();

  constructor() { }

  ngOnInit(): void { }

  selectSize(s: Size) {
    if(!s.isSelected){
      this.resetSelection();
      s.select();
      this.SelectionChange.emit(s);
    }
  }

  resetSelection() {
    this.sizes.forEach(size => size.deSelect());
  }



}
