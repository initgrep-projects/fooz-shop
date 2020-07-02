import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Size } from 'src/app/models/size';


@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.scss']
})
export class SideFilterComponent implements OnInit {

  @Input() title: string;
  @Input() values: any[] = [];
  @Input() type: string;

  selectedValues: any[] = [];

  @Output() select = new EventEmitter<any[]>();

  isCategoryFilter: boolean = false;
  isSizeFilter: boolean = false;

  constructor() { }

  ngOnInit(): void {

    if (this.type === 'category') {
      this.isCategoryFilter = true;
    }
    if (this.type === 'size') {
      this.isSizeFilter = true;
    }
  }

  onSelectFilter(isChecked: boolean, value: any) {
    console.log('onSelectFilter - ', isChecked, value);
    console.log('this.selectedValues = ', this.selectedValues);
    if (isChecked) {
      this.selectedValues = [...this.selectedValues, value];
    } else {
      if (this.isCategoryFilter) {
        const selectedCategories = this.selectedValues as Category[];
        const category = value as Category;
        this.selectedValues = selectedCategories.filter(cat => !cat.equals(category));
      }
      if (this.isSizeFilter) {
        const selectedSize = this.selectedValues as Size[];
        const size = value as Size;
        this.selectedValues = selectedSize.filter(s => !s.equals(size));
      }
    }
    this.emitSelectEvent();
  }

  emitSelectEvent() {
    this.select.emit(this.selectedValues);
  }


}
