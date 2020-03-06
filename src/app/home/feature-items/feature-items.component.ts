import { Component, OnInit } from '@angular/core';
import { RemoteService } from 'src/app/services/remote.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-feature-items',
  templateUrl: './feature-items.component.html',
  styleUrls: ['./feature-items.component.scss']
})
export class FeatureItemsComponent implements OnInit {

  constructor( private remoteService: RemoteService) { }

  items: Product[];

  ngOnInit() {
    this.items = this.remoteService.getProducts();
  }



}
