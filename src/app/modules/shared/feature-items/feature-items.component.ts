import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { featureItemsLabels } from 'src/app/util/app.labels';
import { staggerFadeIn } from 'src/app/animations/fadeAnimation';


@Component({
  selector: 'app-feature-items',
  templateUrl: './feature-items.component.html',
  styleUrls: ['./feature-items.component.scss'],
  animations: [
    staggerFadeIn
  ]
})
export class FeatureItemsComponent implements OnInit {
  labels = featureItemsLabels;
  @Input() title:string;
  @Input() products: Product[] = [];

  constructor() { }

  ngOnInit() {}

}
