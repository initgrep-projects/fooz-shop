import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ItemDetailService } from '../../shop/items/item-detail/item-detail.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {

  @Input() colors: Color[];
  @Output() SelectionChange = new EventEmitter<Color>();

  constructor() { }

  ngOnInit(): void {
  }

  selectColor(c: Color) {
    if (!c.isSelected) {
      this.resetSelection();
      c.select();
      this.SelectionChange.emit(c);
    } else {
      this.resetSelection();
    }

  }

  resetSelection() {
    this.colors.forEach(c => c.deSelect());
  }

}
