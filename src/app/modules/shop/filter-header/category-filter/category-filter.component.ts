import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Category } from 'src/app/models/category';
import { FilterHeaderService } from '../filter-header.service';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {

  @Input() categories: Category[];
  @Input() selectedCategory: Category;
  @Output() categoryChange = new EventEmitter<Category>();



  constructor(private filterHeaderService: FilterHeaderService) { }

  ngOnInit(): void {
  }

  emitCategoryChange(category: Category) {
    this.categoryChange.emit(category);
  }


}
