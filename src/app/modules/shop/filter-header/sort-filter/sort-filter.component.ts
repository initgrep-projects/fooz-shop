import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Sort } from 'src/app/models/Sort';
import { FilterHeaderService } from '../filter-header.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sort-filter',
  templateUrl: './sort-filter.component.html',
  styleUrls: ['./sort-filter.component.scss']
})
export class SortFilterComponent implements OnInit {

  @Input() sortOrders: Sort[];
  @Input() selectedSortOrder: Sort;
  @Output() sortOrderChange = new EventEmitter<Sort>();

  constructor(private filterHeaderService: FilterHeaderService) { }

  ngOnInit(): void {

  }

  emitSortOrderChange(s: Sort) {
    this.sortOrderChange.emit(s);
  }
}
