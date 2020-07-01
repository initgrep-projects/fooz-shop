import { Location } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { isEmpty } from 'lodash';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { fadeIn } from 'src/app/animations/fadeAnimation';
import { SubSink } from 'subsink';
import { HomeService } from '../../home/home.service';
import { ProductService } from '../../shop/product.service';



@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  animations: [
    fadeIn
  ]
})
export class StatusComponent implements OnInit {
  statusObservables: Observable<any>[] = [];
  @Output() loaded = new EventEmitter();
  
  constructor(
    private ps: ProductService,
    private hs: HomeService,
    private location: Location
  ) { }

  ngOnInit(): void {



    this.location.onUrlChange((url, state) => {
      console.log('status url = ', url, state);

      if (url.indexOf('home')) {
        console.log("we have a home route");
        this.statusObservables = [this.hs.latestProducts$, this.hs.lookbookItems$, this.hs.trendItems$];
      }

      const sub = combineLatest(this.statusObservables)
        .subscribe(([ps, ls]) => {
          console.log("before everything loaded in home page", ps, ls);
          if (!isEmpty(ps) && !isEmpty(ls)) {
            console.log("everything loaded in home page", ps, ls);
            this.loaded.emit();
            sub.unsubscribe();
          }
        });

    });

  }



}
