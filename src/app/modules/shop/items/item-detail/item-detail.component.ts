import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  product: Product;

  constructor( private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.product = data.product as Product;
    });
  }

}
