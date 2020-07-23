import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {



  constructor(
    private route: ActivatedRoute,
    private hs: HomeService,
  ) { }

  ngOnInit() { }

  collectionTitle$ = this.route.queryParams
    .pipe(
      map(param => decodeURIComponent(param.col)),
      switchMap(
        title => this.hs.lookbookItems$
        .pipe(
          map(lbs => lbs?.filter(lb => lb.Label === title)),
          map(lbs => lbs?.pop())
          )));

}
