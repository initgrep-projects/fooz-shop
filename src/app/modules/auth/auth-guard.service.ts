import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { RouteManagementService } from '../main/route-management.service';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private routeMgmtService: RouteManagementService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    return this.authService.user$
      .pipe(
        take(1),
        map((user: User) => {
          if (!!user && !user.IsAnonymous) {
            return true;
          } else {
            this.routeMgmtService.incomingUrl = state.url; /** save the route for redirection after auth success */
            this.routeMgmtService.routeToAuth();
            return false;
          }
        })
      )
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    return this.authService.user$
      .pipe(
        take(1),
        map((user: User) => {
          if (!!user && !user.IsAnonymous) {
            return true;
          } else {
            this.routeMgmtService.incomingUrl = state.url; /** save the route for redirection after auth success */
            this.routeMgmtService.routeToAuth();
            return false;
          }
        })
      )
  }
}
