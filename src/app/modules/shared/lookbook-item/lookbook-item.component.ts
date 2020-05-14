import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-lookbook-item',
  templateUrl: './lookbook-item.component.html',
  styleUrls: ['./lookbook-item.component.scss']
})
export class LookbookItemComponent implements OnInit {

  @Input('item') product: Product;
  
  constructor() { }

  ngOnInit(): void {
  }

}
