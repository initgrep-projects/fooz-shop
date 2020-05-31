import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Size } from 'src/app/models/size';
import { FilterHeaderService } from '../filter-header.service';

@Component({
  selector: 'app-size-filter',
  templateUrl: './size-filter.component.html',
  styleUrls: ['./size-filter.component.scss']
})
export class SizeFilterComponent implements OnInit {

  @Input() sizes: Size[];
  @Input() selectedSize: Size;
  @Output() sizeChange = new EventEmitter<Size>();

  constructor(private filterHeaderService: FilterHeaderService ) { }

  ngOnInit(): void {
  }

  emitSizeChange(s: Size) {
    this.sizeChange.emit(s);
  }
}
