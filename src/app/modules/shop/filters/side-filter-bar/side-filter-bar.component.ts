import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilterService } from '../filter.service';
import { SubSink } from 'subsink';
import { Category } from 'src/app/models/category';
import { Size } from 'src/app/models/size';
import { Sort } from 'src/app/models/Sort';

@Component({
  selector: 'app-side-filter-bar',
  templateUrl: './side-filter-bar.component.html',
  styleUrls: ['./side-filter-bar.component.scss']
})
export class SideFilterBarComponent implements OnInit {



  constructor(public fhs: FilterService) { }

  ngOnInit(): void {

  }

  onCategoryFilterSelect(categories: Category[]) {
    console.log('onCategoryFilterSelect ', categories);
    this.fhs.setSelectedCategories(categories);
  }
  onSizeFilterSelect(sizes: Size[]) {
    console.log('onSizeFilterSelect ', sizes);
    this.fhs.setSelectedSizes(sizes);
  }



}
