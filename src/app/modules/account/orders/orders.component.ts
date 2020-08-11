import { Component, OnInit } from '@angular/core';
import { AuthMessages, orderLables } from 'src/app/util/app.labels';
import { OrderService } from './order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  labels = orderLables;
  constructor(public ods: OrderService) { }

  ngOnInit(): void {
  }

}
