import { AfterContentInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { cloneDeep } from 'lodash';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CartItem } from 'src/app/models/cart-item';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit, AfterContentInit, OnDestroy {
  private subs = new SubSink();

  @Input() item: CartItem;
  @Output() itemDelete = new EventEmitter<string>();
  @Output() quantityChange = new EventEmitter<CartItem>();
  @Output() clicked = new EventEmitter<string>();

  itemSelectedQuantity: number;
  private debouncer = new Subject<CartItem>();

  constructor() { }


  ngOnInit(): void {
    this.debounceQuantityChangeEvent();
  }

  ngAfterContentInit() {
    this.itemSelectedQuantity = this.item.SelectedQuantity;
  }

  onQuantityChange(q: number) {
    const item = cloneDeep(this.item);
    this.itemSelectedQuantity = item.SelectedQuantity = q;
    this.debouncer.next(item);
  }

  debounceQuantityChangeEvent() {
    this.subs.sink =
      this.debouncer
        .pipe(debounceTime(1000))
        .subscribe(item => this.quantityChange.emit(item));
  }

  deleteItem() {
    this.itemDelete.emit(this.item.Id);
  }

  goToItem() {
    this.clicked.emit(this.item.Product.Id);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }



}
