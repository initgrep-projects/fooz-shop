import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { isEmpty } from 'lodash';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap, tap, mergeMap, scan } from 'rxjs/operators';
import { secondaryLayoutConfig } from 'src/app/config/app.routes';
import { AppState } from '../../main/store/app.reducer';


@Injectable({
  providedIn: 'root'
})
export class StatusService {

  statusObservables: Observable<any>[] = [];
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  isMainRoute$ = this.router.events
    .pipe(
      filter(event => event instanceof NavigationStart),
      map((event: NavigationStart) => secondaryLayoutConfig.filter(routeUrl => event.url.indexOf(routeUrl) !== -1)),
      map(matchedRoutes => !isEmpty(matchedRoutes) ? false : true)
    );

  routeObservable$ = this.router.events
    .pipe(
      filter(event => event instanceof NavigationStart),
      tap(event => console.log('events are ', event)),
      map((event: NavigationStart) => event.url),
      switchMap(url =>  {
        const routeObs = this.whichRoute(url);
       return !isEmpty(routeObs) ? combineLatest<{ [key: string]: any }[]>(this.whichRoute(url)) : of([]);
    }),
      map(vals => vals.map(val => new Map(Object.entries(val)))),
      map((mappedStates: Map<string, any>[]) => {
        return mappedStates.map((stateMap, index) => {
          console.log('statemap , index', index, stateMap);
          for (let k of stateMap.keys()) {
            let v = stateMap.get(k);
            if (k === 'error' && !!v) {
              return false;
            }
            if (!v?.length) {
              return !isEmpty(v);
            } else {
              return v.map((o: any[]) => !isEmpty(o)).reduce((b: boolean, a: boolean) => a && b);
            }
          }
          return true;
        });
      }),
      map(rs => !isEmpty(rs) ? rs.reduce((b, a) => a && b) : true)
    );


  private whichRoute(url: String): Observable<any>[] {
    if (url.indexOf('home') !== -1) {
      console.log('we home');
      return [this.store.select('header'), this.store.select('home')];
    } else if (url.indexOf('shop') !== -1) {
      console.log('we shop');
      return [this.store.select('header'), this.store.select('shop')];
    }
    return [];
  }


}