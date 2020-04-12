import { Component, OnInit, Input } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ItemDetailService } from '../item-detail.service';

@Component({
  selector: 'app-item-color',
  templateUrl: './item-color.component.html',
  styleUrls: ['./item-color.component.scss']
})
export class ItemColorComponent implements OnInit {

  @Input() colors: Color[];
  constructor(private itemdetailService: ItemDetailService) { }

  ngOnInit(): void {
  }

  selectColor(c: Color) {
    if (!c.isSelected()) {
      this.resetSelection();
      c.select();
    } else {
      this.resetSelection();
    }
    this.itemdetailService.setSelectedColors(this.colors);
  }

  resetSelection() {
    this.colors.forEach(c => c.deSelect());
  }

}
