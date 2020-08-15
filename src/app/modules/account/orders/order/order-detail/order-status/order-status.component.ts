import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { orderLables } from 'src/app/util/app.labels';
import { OrderStatusInput } from '../../../order.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {
  labels = orderLables;

  @Input() stage: OrderStatusInput;

  constructor() { }

  ngOnInit(): void { }



}
