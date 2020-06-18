import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { cloneDeep } from 'lodash';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() item:CartItem;
  @Output() itemDelete = new EventEmitter<string>();
  @Output() quantityChange =  new EventEmitter<CartItem>();
  @Output() clicked = new EventEmitter<string>();


  constructor(private cartService: CartService) { }

 
  ngOnInit(): void { }


  onQuantityChange(q: number){
    this.item.SelectedQuantity =  q;
 
    this.quantityChange.emit(this.item);
  }

  deleteItem(){
    this.itemDelete.emit(this.item.Id);
  }

  goToItem(){
    this.clicked.emit(this.item.Product.Id);
  }


  


}
