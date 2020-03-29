import { Component, OnInit, Input } from '@angular/core';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-item-color',
  templateUrl: './item-color.component.html',
  styleUrls: ['./item-color.component.scss']
})
export class ItemColorComponent implements OnInit {

  @Input() colors: Color[];
  constructor() { }

  ngOnInit(): void {
  }

  selectColor(c: Color) {
    // this.resetSelection();
    if (c.isSelected()) {
      c.deSelect();
    } else {
      c.select();
    }
  }


  resetSelection() {
    this.colors.forEach(c => c.deSelect());
  }

}
