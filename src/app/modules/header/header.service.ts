import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../main/store/app.reducer';
import { loadBrand } from './store/header.actions';
import { map, filter, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Router, NavigationStart } from '@angular/router';
import { secondaryLayoutConfig } from 'src/app/config/app.routes';
import { isEmpty } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  brand$ = this.store.select('header').pipe(map(state => state.brand));
  isCheckoutRoute = false;

  constructor(
    private store: Store<AppState>,
    private location: Location,
    private router: Router
  ) {
    this.store.dispatch(loadBrand());
  }


  isMainRoute$ = this.router.events
    .pipe(
      filter(event => event instanceof NavigationStart),
      map((event: NavigationStart) => event.url),
      tap(url => this.isCheckoutRoute = (url.indexOf('checkout') !== -1 ? true : false)),
      tap(url => console.log('isCheckoutroute => ', this.isCheckoutRoute)),
      map(url => secondaryLayoutConfig.filter(routeUrl => url.indexOf(routeUrl) !== -1)),
      map(matchedRoutes => !isEmpty(matchedRoutes) ? false : true)
    );



  goBack() { this.location.back(); }
}
