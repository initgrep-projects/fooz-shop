import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {

  @Input() categories: Category[];
  @Input() selectedCategories: Category[] = [];
  @Output() categoryChange = new EventEmitter<Category>();



  constructor() { }

  ngOnInit(): void {
  }

  emitCategoryChange(category: Category) {
    this.categoryChange.emit(category);
  }

  getIcon() {
    return !!this.selectedCategories[0] ? this.selectedCategories[0].Icon : 'layer-group';
  }

}
