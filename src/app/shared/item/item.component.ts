import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Image } from 'src/app/models/image';
import { Color } from 'src/app/models/color';
import { LogService } from 'src/app/shop/services/log.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() item: Product;
  cardImages: Image[] = [];

  constructor(
    private logger: LogService,
    private router: Router) { }



  ngOnInit(): void {
    this.setInitImages();
  }

  routeToItemDetails() {
    this.router.navigate(['item/details']);
  }

  setInitImages() {
    this.cardImages = [this.item.images[0], this.item.images[1]];
  }


  showThiscolorImages(color: Color) {
    this.logger.info(' color clicked ', color.getCode());
    const selectedImages = [];
    this.item.images.forEach((image) => {
        if (image.getColor() === color && selectedImages.length < 2) {
          selectedImages.push(image);
        }

        this.logger.info('images = ', selectedImages);
    });

    this.cardImages = [...selectedImages];
  }


}
