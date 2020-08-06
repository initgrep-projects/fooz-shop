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

  routeToIncomingUrl() {
    console.log('routeToIncomingUrl called => ', this.incomingUrl, this.previousUrl, this.currentUrl);
    if (!!this.incomingUrl) {
      console.log('routeToIncoming incoming =>', this.incomingUrl);
      this.router.navigateByUrl(this.incomingUrl, { replaceUrl: true });
    }
    else if (!!this.previousUrl) {
      console.log('routeToIncoming previous =>', this.previousUrl);
      this.router.navigateByUrl(this.previousUrl, { replaceUrl: true });
    } else {
      const sanitizedUrl = this.currentUrl.split('(secure:auth)')[0];
      console.log('routeToIncoming santized => ', sanitizedUrl);
      this.router.navigateByUrl(sanitizedUrl, { replaceUrl: true });
    }
  }



  routeToPayment() {
    this.router.navigate(['/checkout/payment']);
  }

  routeToProfile() {
    this.router.navigate(['/account/profile/edit']);
  }
  routeToAuth() {
    this.router.navigate([{ outlets: { 'secure': ['auth'] } }]);
  }




  private setIncomingUrlsFromEvent(event: NavigationEnd) {
    this.previousUrl = this.currentUrl ? this.currentUrl : null;
    this.currentUrl = event.url;
  }

  private scrollToTop() {
    window.scrollTo(0, 0);
  }
}
