import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/models/category';
import { ItemDetailService } from '../item-detail.service';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.scss']
})
export class ItemCategoryComponent implements OnInit {

  centerOpenAbaya: Category;
  buttonedAbaya: Category;

  @Input() category: Category;
  constructor( private itemdetailService: ItemDetailService) { }

  ngOnInit(): void {
    this.centerOpenAbaya = new Category('CO', 'center open','door-open');
    this.buttonedAbaya = new Category('BA', 'buttoned abaya','dot-circle');
    this.setCategory(this.category.Code);
    console.log('category => ', this.category);

  }

  isButtonedAbaya() {
    return this.category.Code === this.buttonedAbaya.Code;
  }
  isCenterOpenAbaya() {
    return this.category.Code === this.centerOpenAbaya.Code;
  }

  setCategory(code: string) {
    if (code === this.centerOpenAbaya.Code) {
      this.category = this.centerOpenAbaya;
    } else {
      this.category = this.buttonedAbaya;
    }
    this.itemdetailService.setSelectedCategory(this.category);
  }

}
