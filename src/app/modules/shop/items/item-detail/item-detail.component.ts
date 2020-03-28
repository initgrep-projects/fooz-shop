import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit, OnDestroy {

  product: Product;

  subs: Subscription[] = [];

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recieveProductFromResolver();
  }

  recieveProductFromResolver() {
    this.subs[this.subs.length + 1] =
      this.route.data.subscribe(data => {
        this.product = data.product as Product;
        console.log('detailed product = ', this.product);
      });
  }




  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
