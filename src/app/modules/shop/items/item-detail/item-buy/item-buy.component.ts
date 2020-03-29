import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ToastService } from 'src/app/modules/shared/toasts/toast.service';

@Component({
  selector: 'app-item-buy',
  templateUrl: './item-buy.component.html',
  styleUrls: ['./item-buy.component.scss']
})
export class ItemBuyComponent implements OnInit {

  @Input() product: Product;
  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
  }

  addToCart() {
    this.toastService.show(
      'Item added to Card Successfully ',
      { classname: 'bg-dark text-light', delay: 5000 }
    );
    console.log('added to cart ', this.product);
  }

  

}
