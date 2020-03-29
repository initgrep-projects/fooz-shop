import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-quantity',
  templateUrl: './item-quantity.component.html',
  styleUrls: ['./item-quantity.component.scss']
})
export class ItemQuantityComponent implements OnInit {

  @Input() quantity: number;
  constructor() { }

  ngOnInit(): void {
    this.quantity = 1;
  }

  increment() {
    if (this.quantity < 10) {
      this.quantity++;
    }
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

}
