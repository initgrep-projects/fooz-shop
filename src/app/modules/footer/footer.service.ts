import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, tap } from 'rxjs/operators';
import { mainFooterLayoutConfig } from 'src/app/config/app.routes';
import { AppState } from '../main/store/app.reducer';
import { isEmpty } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  brand$ = this.store.select('header').pipe(map(state => state.brand));
  isCheckoutRoute = false;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
  }


  isMainRoute$ = this.router.events
    .pipe(
      filter(event => event instanceof NavigationStart),
      map((event: NavigationStart) => event.url),
      tap(url => this.isCheckoutRoute = (url.indexOf('checkout') !== -1 ? true : false)),
      map(url => mainFooterLayoutConfig.filter(routeUrl => url.indexOf(routeUrl) !== -1)),
      map(matchedRoutes => !isEmpty(matchedRoutes) ? true : false)
    );


}
