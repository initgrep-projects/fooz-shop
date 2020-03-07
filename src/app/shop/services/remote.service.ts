import { Injectable } from '@angular/core';
import { LogService } from './log.service';
import { Category } from 'src/app/models/category';
import { Color } from 'src/app/models/color';
import { Size } from 'src/app/models/size';
import { Product } from 'src/app/models/product';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { fetchProductsAction } from '../store/shop.actions';
import { Image } from 'src/app/models/image';


@Injectable({
  providedIn: 'root'
})
export class RemoteService {



  constructor(private logger: LogService,
              private store: Store<AppState>
    ) {
      logger.info("remote service is initialized ");
      this.getProducts();
    }

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
    const image4 = new Image('https://i.imgur.com/fZube9X.jpg', blackColor);

    const image1g = new Image('https://i.imgur.com/IQPOZ5A.jpg', greyColor);
    const image2g = new Image('https://i.imgur.com/9YwoGKg.jpg', greyColor);

    const image1p = new Image('https://i.imgur.com/J3Vq5Rl.jpg', purpleColor);
    const image2p = new Image('https://i.imgur.com/hYMUHqS.jpg', purpleColor);



    const products =  [
      new Product(
        'Spring Dark Folded abaya',
        '11331',
        'Women Blue & White Printed Abaya with Colorful Buttons',
        12,
        soCategory,
        [image1, image2, image3, image4],
        [smallSize, mediumSize, xlSize]
      ),
      new Product(
        'Autumn light Folded abaya',
        '11332',
        'Women Blue & White Printed Abaya with Colorful Buttons',
        12,
        soCategory,
        [image1, image2, image1g, image2g],
        [smallSize, mediumSize, ]
      ),
      new Product(
        'summer light Folded abaya',
        '11333',
        'Women Blue & White Printed Abaya with Colorful Buttons',
        12,
        soCategory,
        [image1, image2, image1p, image2p],
        [ largeSize, xlSize]
      ),
      new Product(
        'winter center Folded abaya',
        '11334',
        'Women Blue & White Printed Abaya with Colorful Buttons',
        12,
        soCategory,
        [image1p, image2p, image1g, image2g],
        [smallSize, mediumSize, largeSize, xlSize]
      ),
      new Product(
        'autumn purple Folded abaya',
        '11335',
        'Women Blue & White Printed Abaya with Colorful Buttons',
        12,
        soCategory,
        [image1g, image2g, image1, image2],
        [smallSize, mediumSize, largeSize, xlSize]
      )

    ];

    this.store.dispatch(fetchProductsAction({payload : products}));

  }



}
