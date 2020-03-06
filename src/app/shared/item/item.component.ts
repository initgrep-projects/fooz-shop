import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Image } from 'src/app/models/image';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  constructor( private router: Router) { }

  @Input() item: Product;

  ngOnInit(): void {
  }

  routeToItemDetails() {
    this.router.navigate(['item/details']);
  }

  getAvailableColors() {
    const colorCodes: string[] =
    this.item.colors.map(color =>{
      return color.code;
    });
    return colorCodes;
  }


}
