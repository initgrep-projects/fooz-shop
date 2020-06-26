import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { User } from 'src/app/models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router:Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    console.log('authGuardservice canactivate called');
    return this.authService.user$
    .pipe(
      take(1),
      map((user:User) => {
        if(!!user && !user.IsAnonymous){
          return true;
        }else{
          this.router.navigate([{outlets: {'secure': ['auth']}}]);
          return false;
        }
      })
    )
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    return this.authService.user$
    .pipe(
      take(1),
      map((user:User) => {
        if(!!user && !user.IsAnonymous){
          return true;
        }else{
          this.router.navigate([{outlets: {'secure': ['auth']}}]);
          return false;
        }
      })
    )
  }
}
