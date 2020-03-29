import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Image } from 'src/app/models/image';
import { Color } from 'src/app/models/color';
import { LogService } from 'src/app/services/log.service';
import { SourceMapGenerator } from '@angular/compiler/src/output/source_map';

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
      ['item', this.item.Id],
       { 
         queryParams: {source: this.sourcePage},
         relativeTo: this.activatedRoute
        });
  }

  setInitImages() {
    this.cardImages = [this.item.Images[0], this.item.Images[1]];
  }


  showSimilarcolorImages(color: Color) {
    this.logger.info(' color clicked ', color.getCode());
    this.logger.info('item-images = ', this.item.Images);

    const selectedImages = this.getSelectedImages(color);

    this.logger.info('selected images = ', selectedImages);

    this.cardImages = [...selectedImages];
  }

  getSelectedImages(c: Color) {
    return  this.item.Images.filter( image => {
      if (image.getColor().getCode() === c.getCode()) {
        return image;
      }
    });
  }

}
