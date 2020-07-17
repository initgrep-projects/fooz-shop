import { Component, EventEmitter, Input, OnInit, Output, AfterContentInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { CartItem } from 'src/app/models/cartItem';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit, AfterContentInit {

  @Input() item:CartItem;
  @Output() itemDelete = new EventEmitter<string>();
  @Output() quantityChange =  new EventEmitter<CartItem>();
  @Output() clicked = new EventEmitter<string>();

  itemSelectedQuantity: number;

  constructor() { }

 
  ngOnInit(): void { }

  ngAfterContentInit(){
    this.itemSelectedQuantity = this.item.SelectedQuantity;
  }

  onQuantityChange(q: number){
    const item =  cloneDeep(this.item);
    this.itemSelectedQuantity = q;
    this.quantityChange.emit(item);
  }

  deleteItem(){
    this.itemDelete.emit(this.item.Id);
  }

  goToItem(){
    this.clicked.emit(this.item.Product.Id);
  }


  


}
