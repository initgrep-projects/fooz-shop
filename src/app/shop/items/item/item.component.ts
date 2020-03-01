import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  constructor( private router:Router) { }

  ngOnInit(): void {
  }

  routeToItemDetails() {
    this.router.navigate(['item/details']);
  }

}
