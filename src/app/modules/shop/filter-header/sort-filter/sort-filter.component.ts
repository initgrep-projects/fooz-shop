import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Sort } from 'src/app/models/Sort';

@Component({
  selector: 'app-sort-filter',
  templateUrl: './sort-filter.component.html',
  styleUrls: ['./sort-filter.component.scss']
})
export class SortFilterComponent implements OnInit {

  @Input() sortOrders: Sort[];
  @Input() selectedSortOrder: Sort;
  @Output() sortOrderChange = new EventEmitter<Sort>();

  constructor(
  ) { }

  ngOnInit(): void {
  }

  emitSortOrderChange(s: Sort) {
    this.sortOrderChange.emit(s);
  }

}
