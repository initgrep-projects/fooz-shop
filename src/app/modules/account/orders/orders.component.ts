import { Component, OnInit } from '@angular/core';
import { AuthMessages } from 'src/app/util/app.labels';
import { OrderService } from './order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  labels = AuthMessages;
  constructor(public ods: OrderService) { }

  ngOnInit(): void {
  }

}
