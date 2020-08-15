import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { tap, filter, map } from 'rxjs/operators';
import { SubscriptionLike, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteManagementService {

  incomingUrl: string; /** to be set by authguard service */
  previousUrl: string;
  currentUrl: string;
  routerEventSubsription: SubscriptionLike;

  constructor(
    private router: Router
  ) {

    this.routerEventSubsription =
      this.routerEvents$.subscribe();

  }


  routerEvents$ = this.router.events
    .pipe(
      tap(event => {
        if (event instanceof NavigationEnd) {
          this.setIncomingUrlsFromEvent(event);
          this.scrollToTop();
        }
      })
    );

  navigationStart$ = this.router.events.pipe(
    filter(event => event instanceof NavigationStart),
    map((event: NavigationStart) => event)
  );

  resetAuthOutlet() {
    console.log('resetAuthOutlet called');
    this.router.navigate([{ outlets: { '@secure': null } }]);
  }

  routeToIncomingUrl() {
    if (!!this.incomingUrl) {
      this.router.navigateByUrl(this.incomingUrl);
    }
  }

  routeToPayment() {
    this.router.navigate(['/checkout/payment']);
  }

  routeToProfile() {
    this.router.navigate(['/account/profile/edit']);
  }

  routeToOrders() {
    this.router.navigate(['/account/orders']);
  }
  routeToAuth() {
    this.router.navigate([{ outlets: { '@secure': ['auth'] } }], { skipLocationChange: true });
  }




  private setIncomingUrlsFromEvent(event: NavigationEnd) {
    this.previousUrl = this.currentUrl ? this.currentUrl : null;
    this.currentUrl = event.url;
  }

  private scrollToTop() {
    window.scrollTo(0, 0);
  }
}
