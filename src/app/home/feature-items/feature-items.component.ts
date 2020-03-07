import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/models/product';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { RemoteService } from 'src/app/shop/services/remote.service';

@Component({
  selector: 'app-feature-items',
  templateUrl: './feature-items.component.html',
  styleUrls: ['./feature-items.component.scss']
})
export class FeatureItemsComponent implements OnInit {

  constructor(
    private remoteService: RemoteService,
    private store: Store<AppState>) { }

  items: Product[];

  ngOnInit() {
    this.store.select('shop').subscribe(state => {
      this.items = state.products;
    });
  }



}
