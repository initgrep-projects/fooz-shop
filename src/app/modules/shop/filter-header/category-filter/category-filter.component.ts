import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Category } from 'src/app/models/category';
import { FilterHeaderService } from '../filter-header.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit, OnDestroy {

  @Input() categories: Category[];
  @Input() selectedCategory: Category;
  @Output() categoryChange = new EventEmitter<Category>();

  subs: Subscription[] = [];


  constructor(private filterHeaderService: FilterHeaderService) { }

  ngOnInit(): void {
    this.dispatchCategoriesToStore();
  }

  emitCategoryChange(category: Category) {
    this.categoryChange.emit(category);
  }

  dispatchCategoriesToStore() {
    this.subs[this.subs.length + 1] =
      this.filterHeaderService.fetchCategories().subscribe();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
