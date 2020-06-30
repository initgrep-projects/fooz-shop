import { Location } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { isEmpty } from 'lodash';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { fadeIn } from 'src/app/animations/fadeAnimation';
import { SubSink } from 'subsink';
import { HomeService } from '../../home/home.service';
import { ProductService } from '../../shop/product.service';



@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  animations:[
    fadeIn
  ]
})
export class StatusComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  @Output() loaded = new EventEmitter();
  constructor(
    private ps: ProductService,
    private hs: HomeService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.subs.sink =
      combineLatest(this.ps.getShopFromStore().pipe(map(state => state.products)), this.hs.lookbookItems$)
        .subscribe(([ps, ls]) => {
          console.log("before everything loaded in home page", ps, ls);
          if (!isEmpty(ps) && !isEmpty(ls)) {
            console.log("everything loaded in home page", ps, ls);
            this.loaded.emit();
          }

        }); 
      
        this.location.onUrlChange((url, state) => {
          console.log('location url change = ', url, state);
          
        });
     
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
