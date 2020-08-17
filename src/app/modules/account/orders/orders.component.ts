import { Component, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/animations/fadeAnimation';
import { orderLables } from 'src/app/util/app.labels';
import { OrderService } from './order.service';
import { RouteManagementService } from '../../main/route-management.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [
    fadeIn
  ]
})
export class OrdersComponent implements OnInit {
  labels = orderLables;
  constructor(
    public ods: OrderService,
    public rmgt: RouteManagementService
  ) { }

  ngOnInit(): void {
  }

}
