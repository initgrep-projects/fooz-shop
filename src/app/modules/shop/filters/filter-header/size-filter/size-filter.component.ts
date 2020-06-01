import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Size } from 'src/app/models/size';

@Component({
  selector: 'app-size-filter',
  templateUrl: './size-filter.component.html',
  styleUrls: ['./size-filter.component.scss']
})
export class SizeFilterComponent implements OnInit {

  @Input() sizes: Size[];
  @Input() selectedSizes: Size[] = [];
  @Output() sizeChange = new EventEmitter<Size>();

  constructor( ) { }

  ngOnInit(): void {
  }

  emitSizeChange(s: Size) {
    this.sizeChange.emit(s);
  }
}
