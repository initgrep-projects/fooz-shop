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
export class StatusComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  statusObservables: Observable<any>[] = [];
  @Output() loaded = new EventEmitter();

  constructor(
    private ps: ProductService,
    private hs: HomeService,
    private location: Location
  ) { }

  ngOnInit(): void {



    this.location.onUrlChange((url, state) => {

      if (url.indexOf('home')) {
        console.log("home routes");
        this.statusObservables = [this.hs.latestProducts$, this.hs.lookbookItems$, this.hs.trendItems$];
      } else if (url.indexOf('shop')) {
        console.log('shop routes');
        this.statusObservables = [this.ps.products$, this.ps.customSizeInputs$];
      }

      this.checkstatus();

    });

  }


  checkstatus() {
    if (!isEmpty(this.statusObservables)) {
      this.subs.sink = combineLatest(this.statusObservables)
        .subscribe(([ps, ls]) => {
          console.log("before everything loaded in home page", ps, ls);
          if (!isEmpty(ps) && !isEmpty(ls)) {
            console.log("everything loaded in home page", ps, ls);
            this.loaded.emit();
          }
        });
    } else {
      this.loaded.emit();
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
