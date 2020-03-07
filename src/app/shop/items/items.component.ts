import { Component, OnInit } from '@angular/core';
import { RemoteService } from '../services/remote.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

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
