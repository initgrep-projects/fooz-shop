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
export class StatusComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  @Output() loaded = new EventEmitter();
  isLoaded = false;

  constructor(
   private ss:StatusService
  ) { }

  ngOnInit(): void {
    this.subs.sink =
      this.ss.routeObservable$.subscribe(
        state => {
          console.log('state called => ', state); 
          this.isLoaded = state;
          this.loaded.emit();
        }
      )
  }



  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
