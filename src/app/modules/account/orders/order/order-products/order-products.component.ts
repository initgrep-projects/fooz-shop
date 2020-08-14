import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartItem } from 'src/app/models/cart-item';
import { orderLables } from 'src/app/util/app.labels';
import { OrderStatus } from 'src/app/models/order-status.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.scss']
})
export class OrderProductsComponent implements OnInit {
  labels = orderLables;
  @Input() items: CartItem;
  @Input() statusList: OrderStatus[];

  private finalStatus: OrderStatus;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routeToProduct(product: Product) {
    this.router.navigate(['/shop/item', product.Id]);
  }

  /** to be changed as per status order */
  get FinalStatus() {
    const length = this.statusList.length;
    return this.statusList[length - 1];
  }

  formatDate(timeStamp: number) {
    return new Date(timeStamp);
  }
}
