import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Size } from 'src/app/models/size';
import { FilterService } from '../filter.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-side-filter-bar',
  templateUrl: './side-filter-bar.component.html',
  styleUrls: ['./side-filter-bar.component.scss']
})
export class SideFilterBarComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  categories: Category[];
  sizes: Size[];


  constructor(public fhs: FilterService) { }

  ngOnInit(): void {
    this.subs.sink = this.fhs.categories$.subscribe(c => this.categories = c);
    this.subs.sink = this.fhs.sizes$.subscribe(s => this.sizes = s);
  }

  onCategoryFilterSelect(categories: Category[]) {
    console.log('onCategoryFilterSelect ', categories);
    this.fhs.setSelectedCategories(categories);
  }
  onSizeFilterSelect(sizes: Size[]) {
    console.log('onSizeFilterSelect ', sizes);
    this.fhs.setSelectedSizes(sizes);
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
