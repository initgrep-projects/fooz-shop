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
  @Input() sourcePage: string;
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
    this.router.navigate(
      ['shop/item', this.item.Id]);
  }

  setInitImages() {
    this.cardImages = [this.item.Images[0], this.item.Images[1]];
  }


  showSimilarcolorImages(color: Color) {
    this.logger.info(' color clicked ', color.Code);
    this.logger.info('item-images = ', this.item.Images);

    const selectedImages = this.getSelectedImages(color);

    this.logger.info('selected images = ', selectedImages);

    this.cardImages = [...selectedImages];
  }

  getSelectedImages(c: Color) {
    return  this.item.Images.filter( image => {
      if (image.Color.Code === c.Code) {
        return image;
      }
    });
  }

}
