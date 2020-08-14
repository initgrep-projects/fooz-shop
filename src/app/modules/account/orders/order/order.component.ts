import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderStatus } from 'src/app/models/order-status.model';
import { Order } from 'src/app/models/order.modal';
import { orderLables } from 'src/app/util/app.labels';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  labels = orderLables;
  @Input() order: Order;


  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  showDetails(id: string) {
    this.router.navigate([id], { relativeTo: this.activatedRoute });
  }

}
