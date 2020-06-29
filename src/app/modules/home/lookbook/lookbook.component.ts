import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';
import { ProductService } from '../../shop/product.service';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-lookbook',
  templateUrl: './lookbook.component.html',
  styleUrls: ['./lookbook.component.scss']
})
export class LookbookComponent implements OnInit, OnDestroy {

  subs: Subscription[] = [];

  constructor(
    public homeService: HomeService
  ) { }

  ngOnInit() {

  }

  

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
