import { Location } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { isEmpty } from 'lodash';
import { combineLatest, Observable } from 'rxjs';
import { fadeIn } from 'src/app/animations/fadeAnimation';
import { SubSink } from 'subsink';
import { HeaderService } from '../../header/header.service';
import { HomeService } from '../../home/home.service';
import { ProductService } from '../../shop/product.service';
import { StatusService } from './status.service';



@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  animations: [
    fadeIn
  ]
})
export class StatusComponent implements OnInit {

  constructor( public ss:StatusService) { }

  ngOnInit(): void {
   
  }

}
