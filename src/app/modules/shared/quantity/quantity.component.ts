import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss']
})
export class QuantityComponent implements OnInit {

  @Input() value: number;
  @Input() limit: number;
  @Output() valueChange = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  increment() {
    if (!!this.limit) {
      if (this.value + 1 <= this.limit) {
        ++this.value;
        this.valueChange.emit(this.value);
      }
    } else {
      ++this.value;
      this.valueChange.emit(this.value);
    }
  }

  decrement() {
    if (this.value - 1 > 0) {
      --this.value;
      this.valueChange.emit(this.value);
    }

  }

}
