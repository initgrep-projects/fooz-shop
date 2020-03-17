import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Sort } from 'src/app/models/Sort';
import { FilterHeaderService } from '../filter-header.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sort-filter',
  templateUrl: './sort-filter.component.html',
  styleUrls: ['./sort-filter.component.scss']
})
export class SortFilterComponent implements OnInit, OnDestroy {

  @Input() sortOrders: Sort[];
  @Input() selectedSortOrder: Sort;
  @Output() sortOrderChange = new EventEmitter<Sort>();

  subs: Subscription[] = [];

  constructor(private filterHeaderService: FilterHeaderService) { }

  ngOnInit(): void {
    this.dispatchSortOrdersToStore();
  }

  emitSortOrderChange(s: Sort) {
    this.sortOrderChange.emit(s);
  }

  dispatchSortOrdersToStore() {
    this.subs[this.subs.length + 1] =
      this.filterHeaderService.fetchSortOrders().subscribe();
  }


  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
