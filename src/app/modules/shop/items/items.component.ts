import { Component, OnInit } from '@angular/core';
import { staggerFadeIn } from 'src/app/animations/fadeAnimation';
import { FilterService } from '../filters/filter.service';
import { ProductService } from '../product.service';

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


  ngOnInit() { }


}
