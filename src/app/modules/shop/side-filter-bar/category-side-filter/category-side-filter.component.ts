import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-side-filter',
  templateUrl: './category-side-filter.component.html',
  styleUrls: ['./category-side-filter.component.scss']
})
export class CategorySideFilterComponent implements OnInit {

  @Input() title: string;
  @Input() values: Category[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
