import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { Size } from 'src/app/models/size';
import { Sort } from 'src/app/models/Sort';
import { LogService } from 'src/app/services/log.service';
import { ProductService } from '../product.service';
import { FilterService } from '../filters/filter.service';
import { SubSink } from 'subsink';
import { staggerFadeIn } from 'src/app/animations/fadeAnimation';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  animations: [
    staggerFadeIn
  ]
})
export class ItemsComponent implements OnInit {

  moreItemsLoading = false;

  constructor(
    public ps: ProductService,
    public fs: FilterService
  ) { }


  ngOnInit() {
  
  }


}
