import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from 'src/app/models/category';

import { FilterService } from '../filter.service';
import { Size } from 'src/app/models/size';
import { Sort } from 'src/app/models/Sort';
import { LogService } from 'src/app/services/log.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-filter-header',
  templateUrl: './filter-header.component.html',
  styleUrls: ['./filter-header.component.scss']
})
export class FilterHeaderComponent implements OnInit {

  constructor(
    public fhs: FilterService,
    private logger: LogService) { }



  ngOnInit(): void {
 
  }

 



  onCategoryChange(c: Category) {
    this.logger.info('selected category = ', c);
    this.fhs.setSelectedCategories([c]);
  }

  onSizeChange(s: Size) {
    this.logger.info('selected size = ', s);
    this.fhs.setSelectedSizes([s]);
  }

  onSortOrderChange(s: Sort) {
    this.logger.info('selected Sort Change = ', s);
    this.fhs.setSelectedSortOrder(s);
  }



}
