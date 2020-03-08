import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent implements OnInit {
  
  @Input() product: Product;
  constructor() { }

  ngOnInit(): void {
  }

}
