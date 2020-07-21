import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { navLayoutRoutes } from 'src/app/config/app.routes';
import { filter, map } from 'rxjs/operators';
import { isEmpty } from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private router: Router) { }

  isMainRoute$ = this.router.events
    .pipe(
      filter(event => event instanceof NavigationStart),
      map((event: NavigationStart) => navLayoutRoutes.filter(routeUrl => event.url.indexOf(routeUrl) !== -1)),
      map(matchedRoutes => !isEmpty(matchedRoutes) ? false : true)
    );

}