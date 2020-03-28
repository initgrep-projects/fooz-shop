import { Component, OnInit, Input } from '@angular/core';
import { Size } from 'src/app/models/size';

@Component({
  selector: 'app-item-size',
  templateUrl: './item-size.component.html',
  styleUrls: ['./item-size.component.scss']
})
export class ItemSizeComponent implements OnInit {

  @Input() sizes: Size[];
  constructor() { }

  ngOnInit(): void {
  }

  selectSize(s: Size) {
    this.sizes.forEach(s => s.deSelect());
    s.select();
  }

}
