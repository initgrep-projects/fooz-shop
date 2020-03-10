import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Image } from 'src/app/models/image';
import { Color } from 'src/app/models/color';
import { LogService } from 'src/app/services/log.service';

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
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }



  ngOnInit(): void {
    this.setInitImages();
  }

  routeToItemDetails() {
    this.router.navigate(['item', this.item.id], { relativeTo: this.activatedRoute });
  }

  setInitImages() {
    this.cardImages = [this.item.images[0], this.item.images[1]];
  }


  showSimilarcolorImages(color: Color) {
    this.logger.info(' color clicked ', color.getCode());
    this.logger.info('item-images = ', this.item.images);

    const selectedImages = this.getSelectedImages(color);

    this.logger.info('selected images = ', selectedImages);

    this.cardImages = [...selectedImages];
  }

  getSelectedImages(c: Color) {
    return  this.item.images.filter( image => {
      if (image.getColor().getCode() === c.getCode()) {
        return image;
      }
    });
  }

}
