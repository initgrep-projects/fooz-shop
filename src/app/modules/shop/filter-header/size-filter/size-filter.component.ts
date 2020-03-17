import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Size } from 'src/app/models/size';
import { FilterHeaderService } from '../filter-header.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-size-filter',
  templateUrl: './size-filter.component.html',
  styleUrls: ['./size-filter.component.scss']
})
export class SizeFilterComponent implements OnInit, OnDestroy {

  @Input() sizes: Size[];
  @Input() selectedSize: Size;
  @Output() sizeChange = new EventEmitter<Size>();

  subs: Subscription[] = [];
  
  constructor(private filterHeaderService: FilterHeaderService ) { }

  ngOnInit(): void {
    this.dispatchSizesToStore();
  }

  emitSizeChange(s: Size) {
    this.sizeChange.emit(s);
  }

  dispatchSizesToStore() {
    this.subs[this.subs.length + 1] =
    this.filterHeaderService.fetchSizes().subscribe();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
