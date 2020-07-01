import { Injectable } from '@angular/core';
import { LogService } from './log.service';
import { Category } from 'src/app/models/category';
import { Color } from 'src/app/models/color';
import { Size } from 'src/app/models/size';
import { Product } from 'src/app/models/product';
import { Image } from 'src/app/models/image';
import { Currency } from 'src/app/models/currency';
import { Sort } from 'src/app/models/Sort';
import { CustomSizeInput } from '../models/custom-size';
import { LookBookItem } from '../models/lookbook';


@Injectable({
  providedIn: 'root'
})
export class FakedataService {

  constructor(private logger: LogService,
  ) {
    logger.info('remote service is initialized ');
    this.getProducts();
  }

  

  getLookBook(){
    // https://i.imgur.com/WZ35TTq.jpg fooz trend
    const foozTrend =  new Image('https://i.imgur.com/WZ35TTq.jpg',new Color('green', '#808000'));
    const lookBookItem1 = new LookBookItem(foozTrend,'fooz trend');

    // https://i.imgur.com/qHo8OQX.jpg Fooz special

    const foozSpecial = new Image('https://i.imgur.com/qHo8OQX.jpg',new Color('pink', '#FFB6C1'));
    const lookBookItem2 = new LookBookItem(foozSpecial,'fooz Special');
    // https://i.imgur.com/T2KSOdO.jpg Fooz Everyday

    const centerOpen = new Image('https://i.imgur.com/T2KSOdO.jpg',new Color('black', '#f1f1f1'));
    const lookBookItem3 =  new LookBookItem(centerOpen,'fooz everyday');

    return [lookBookItem1, lookBookItem2, lookBookItem3];

  }

  getSizes() {
    const smallSize = new Size('small', 'S');
    const mediumSize = new Size('medium', 'M');
    const largeSize = new Size('large', 'L');
    const xlSize = new Size('extra large', 'XL');
    return [smallSize, mediumSize, largeSize, xlSize];
  }

  getTrendItems() {

    const blackColor = new Color('black', '#333');
    const image1 = new Image('https://i.imgur.com/BhaiCf6.png', blackColor);
    return [image1];
  }




  getCustomSizeInput() {
    const widthSizeValues: number[] = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];
    const lengthSizeValues: number[] = [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64];
    const bustSizeValues: number[] = [33, 34, 35, 36, 37];
    const armSizeValues: number[] = [15, 16, 17, 18, 19, 20];

    return new CustomSizeInput(widthSizeValues, lengthSizeValues, bustSizeValues, armSizeValues, widthSizeValues);
  }

  getCategories() {
    const coCategory = new Category('CO', 'center open');
    const soCategory = new Category('BA', 'buttoned abaya');
    coCategory.Icon = 'door-open';
    soCategory.Icon = 'dot-circle';
    return [soCategory, coCategory];
  }

  getSortOrders() {
    const ascending = new Sort('ASC', ' Price: High to Low', 'long-arrow-alt-up');
    const descending = new Sort('DSC', ' Price: Low to High', 'long-arrow-alt-down');
    return [ascending, descending];
  }

  getProducts(): Product[] {
    this.logger.info('addProducts called');

    const coCategory = new Category('CO', 'center open');
    const soCategory = new Category('BA', 'buttoned abaya');
    coCategory.Icon = 'door-open';
    soCategory.Icon = 'dot-circle';

    const ascending = new Sort('ASC', ' Price: High to Low', 'long-arrow-alt-up');
    const descending = new Sort('DSC', ' Price: Low to High', 'long-arrow-alt-down');


    const blackColor = new Color('black', '#333');
    const greyColor = new Color('grey', '#6c757d');
    const purpleColor = new Color('purple', '#6A5ACD');
    const silverColor = new Color('silver', '#BFC1C2');
    const brownColor = new Color('brown', '#964B00');

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

    const a1000 = new Currency('QAR', 2100);
    const a2200 = new Currency('QAR', 1650);
    const a3100 = new Currency('QAR', 2700);
    const a2300 = new Currency('QAR', 2900);

    return [
      new Product(
        'silver  latest design abaya',
        '51001',
        'A very nice detailed description here',
        12,
        new Date().getTime(),
        a1000,
        soCategory,
        [
          new Image("https://i.imgur.com/dTJ7q2z.jpg", silverColor),
          new Image('https://i.imgur.com/PAFcXGY.jpg', silverColor),
          new Image('https://i.imgur.com/86JpXRY.jpg', silverColor),
          new Image('https://i.imgur.com/IgcZBiC.jpg', silverColor)
        ],
        [smallSize, mediumSize,largeSize, xlSize]
      ),
      new Product(
        'brown latest design abaya',
        '51002',
        'A very nice detailed description here',
        12,
        new Date().getTime(),
        a2200,
        coCategory,
        [
          new Image("https://i.imgur.com/qXOn4hB.jpg", brownColor),
          new Image('https://i.imgur.com/9EIQbqZ.jpg', brownColor),
          new Image('https://i.imgur.com/IClEoEy.jpg', brownColor),
          new Image('https://i.imgur.com/pVkkclk.jpg', brownColor)
        ],
        [smallSize, mediumSize,largeSize, xlSize]
      ),
      new Product(
        'black first latest design abaya',
        '51003',
        'A very nice detailed description here',
        12,
        new Date().getTime(),
        a2300,
        coCategory,
        [
          new Image("https://i.imgur.com/XMGXELs.jpg", blackColor),
          new Image('https://i.imgur.com/58Gz5BQ.jpg', blackColor),
          new Image('https://i.imgur.com/ONXLzwZ.jpg', blackColor),
          new Image('https://i.imgur.com/ZfmxJSa.jpg', blackColor)
        ],
        [smallSize, mediumSize,largeSize, xlSize]
      ),

      new Product(
        'black first latest design abaya',
        '51004',
        'A very nice detailed description here',
        12,
        new Date().getTime(),
        a3100,
        coCategory,
        [
          new Image("https://i.imgur.com/SuswP7o.jpg", blackColor),
          new Image('https://i.imgur.com/gHNtSjV.jpg', blackColor),
          new Image('https://i.imgur.com/o8JDpHl.jpg', blackColor),
          new Image('https://i.imgur.com/m92gSoP.jpg', blackColor)
        ],
        [smallSize, mediumSize,largeSize, xlSize]
      ),

    ];

  }



}
