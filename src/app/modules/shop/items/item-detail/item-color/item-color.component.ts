import { Component, OnInit, Input } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ItemDetailService } from '../item-detail.service';
import { itemLabels } from 'src/app/util/app.labels';

@Component({
  selector: 'app-item-color',
  templateUrl: './item-color.component.html',
  styleUrls: ['./item-color.component.scss']
})
export class ItemColorComponent implements OnInit {
  labels = itemLabels
  @Input() colors: Color[];
  constructor(public itemdetailService: ItemDetailService) { }

  ngOnInit(): void {
  }

  OnSelectionChange(c: Color) {
      this.itemdetailService.setSelectedColors(c);
  }


}
