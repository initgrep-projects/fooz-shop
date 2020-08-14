import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../order.service';
import { orderLables } from 'src/app/util/app.labels';
import { fadeIn } from 'src/app/animations/fadeAnimation';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  animations: [fadeIn]
})
export class OrderDetailComponent implements OnInit {
  labels = orderLables;
  constructor(public ods: OrderService) { }

  ngOnInit(): void {
  }

}
