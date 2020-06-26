import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { Color } from 'src/app/models/color';
import { Image } from 'src/app/models/image';


@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
  animations: [

  ]
})
export class CardItemComponent implements OnInit {
  @Input() item: Product;
  selectedImages:Image[] =[];
  selectedColor: Color;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.selectedColor = this.item.Colors[0];
    this.selectedImages = this.findSimilarColorImages(this.selectedColor);
  }

  routeToItemDetails() {
    this.router.navigate(
      ['shop/item', this.item.Id]);
  }

  getImagesForColor(color: Color){
    this.selectedColor = color;
    this.selectedImages = this.findSimilarColorImages(color);
  }

  findSimilarColorImages(c: Color) {
    return  this.item.Images.filter( image => {
      if (image.Color.Code === c.Code) {
        return image;
      }
    });
  }
}
