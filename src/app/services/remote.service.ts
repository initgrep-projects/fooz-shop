import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { LogService } from './log.service';
import { Category } from '../models/category';
import { Image } from '../models/image';
import { Color } from '../models/color';
import { Size } from '../models/size';

@Injectable({
  providedIn: 'root'
})
export class RemoteService {



  constructor(private logger: LogService) {}

  getProducts() {
    this.logger.info('addProducts called');

    const coCategory = new Category('CO', 'center open');
    const soCategory = new Category('SO', 'center open');

    const blackColor = new Color('black', '#333');
    const greyColor = new Color('grey', '#6c757d');
    const purpleColor = new Color('purple', '#6A5ACD');

    const smallSize = new Size('small', 'S');
    const mediumSize = new Size('medium', 'M');
    const largeSize = new Size('large', 'L');
    const xlSize = new Size('extra large', 'XL');

    const image1 = new Image('https://i.imgur.com/rnRqUoz.jpg', blackColor);
    const image2 = new Image('https://i.imgur.com/ZMloszym.jpg', blackColor);
    const image3 = new Image('https://i.imgur.com/ZMloszym.jpg', blackColor);



    return [
      new Product(
        'Spring Dark Folded abaya',
        '11331',
        'Women Blue & White Printed Abaya with Colorful Buttons',
        12,
        soCategory,
        [image1, image2],
        [blackColor, greyColor, purpleColor],
        [smallSize, mediumSize, largeSize, xlSize]
      ),
      new Product(
        'Autumn light Folded abaya',
        '11332',
        'Women Blue & White Printed Abaya with Colorful Buttons',
        12,
        soCategory,
        [image1, image2],
        [blackColor, greyColor, purpleColor],
        [smallSize, mediumSize, largeSize, xlSize]
      ),
      new Product(
        'summer light Folded abaya',
        '11333',
        'Women Blue & White Printed Abaya with Colorful Buttons',
        12,
        soCategory,
        [image1, image2],
        [blackColor, greyColor, purpleColor],
        [smallSize, mediumSize, largeSize, xlSize]
      ),
      new Product(
        'winter center Folded abaya',
        '11334',
        'Women Blue & White Printed Abaya with Colorful Buttons',
        12,
        soCategory,
        [image1, image2],
        [blackColor, greyColor, purpleColor],
        [smallSize, mediumSize, largeSize, xlSize]
      ),
      new Product(
        'autumn purple Folded abaya',
        '11335',
        'Women Blue & White Printed Abaya with Colorful Buttons',
        12,
        soCategory,
        [image1, image2],
        [blackColor, greyColor, purpleColor],
        [smallSize, mediumSize, largeSize, xlSize]
      )

    ];

  }



}
