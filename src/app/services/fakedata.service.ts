import { Injectable } from '@angular/core';
import { LogService } from './log.service';
import { Category } from 'src/app/models/category';
import { Color } from 'src/app/models/color';
import { Size } from 'src/app/models/size';
import { Product } from 'src/app/models/product';
import { Image } from 'src/app/models/image';
import { Currency } from 'src/app/models/currency';
import { Sort } from 'src/app/models/Sort';


@Injectable({
  providedIn: 'root'
})
export class FakedataService {



  constructor(private logger: LogService,
  ) {
    logger.info('remote service is initialized ');
    this.getProducts();
  }


  getSizes() {
    const smallSize = new Size('small', 'S');
    const mediumSize = new Size('medium', 'M');
    const largeSize = new Size('large', 'L');
    const xlSize = new Size('extra large', 'XL');
    return [smallSize, mediumSize, largeSize, xlSize];
  }

  getCategories() {
    const coCategory = new Category('CO', 'center open');
    const soCategory = new Category('BA', 'buttoned abaya');
    coCategory.seticon('door-open');
    soCategory.seticon('dot-circle');
    return [soCategory, coCategory];
  }

  getSortOrders(){
    const ascending = new Sort('ASC', ' Price: High to Low', 'long-arrow-alt-up');
    const descending = new Sort('DSC', ' Price: Low to High', 'long-arrow-alt-down');
    return [ascending, descending];
  }

  getProducts(): Product[] {
    this.logger.info('addProducts called');

    const coCategory = new Category('CO', 'center open');
    const soCategory = new Category('BA', 'buttoned abaya');
    coCategory.seticon('door-open');
    soCategory.seticon('dot-circle');

    const ascending = new Sort('ASC', ' Price: High to Low', 'long-arrow-alt-up');
    const descending = new Sort('DSC', ' Price: Low to High', 'long-arrow-alt-down');


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
    const image4 = new Image('https://i.imgur.com/fZube9X.jpg', blackColor);

    const image1g = new Image('https://i.imgur.com/IQPOZ5A.jpg', greyColor);
    const image2g = new Image('https://i.imgur.com/9YwoGKg.jpg', greyColor);

    const image1p = new Image('https://i.imgur.com/J3Vq5Rl.jpg', purpleColor);
    const image2p = new Image('https://i.imgur.com/hYMUHqS.jpg', purpleColor);

    const a1000 = new Currency('QAR', 1000);
    const a2200 = new Currency('QAR', 2200);
    const a3100 = new Currency('QAR', 3100);
    const a2300 = new Currency('QAR', 2300);

    return [
      new Product(
        'Spring Dark Folded abaya',
        '11331',
        'Women Blue & White Printed Abaya with Colorful Buttons',
        12,
        1583666024657,
        a1000,
        soCategory,
        [image1, image2, image3, image4],
        [smallSize, mediumSize, xlSize]
      ),
      new Product(
        'Autumn light Folded abaya',
        '11332',
        'Women Blue & White Printed Abaya with Colorful Buttons',
        12,
        1583666094657,
        a2200,
        soCategory,
        [image1, image2, image1g, image2g],
        [smallSize, mediumSize]
      ),
      new Product(
        'summer light Folded abaya',
        '11333',
        'Women Blue & White Printed Abaya with Colorful Buttons',
        12,
        1583696024657,
        a2200,
        coCategory,
        [image1, image2, image1p, image2p],
        [largeSize, xlSize]
      ),
      new Product(
        'winter center Folded abaya',
        '11334',
        'Women Blue & White Printed Abaya with Colorful Buttons',
        12,
        1589666024657,
        a3100,
        coCategory,
        [image1p, image2p, image1g, image2g],
        [smallSize, mediumSize, largeSize, xlSize]
      ),
      new Product(
        'autumn purple Folded abaya',
        '11335',
        'Women Blue & White Printed Abaya with Colorful Buttons',
        12,
        1593666024657,
        a2300,
        soCategory,
        [image1g, image2g, image1, image2],
        [smallSize, mediumSize, largeSize, xlSize]
      )

    ];

  }



}
