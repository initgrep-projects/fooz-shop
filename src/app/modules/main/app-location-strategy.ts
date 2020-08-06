import { Injectable } from '@angular/core';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';

@Injectable()
export class AppLocationStrategy extends PathLocationStrategy implements LocationStrategy {

    static readonly AUX_ROUTE_SEPERATOR = '(secure:auth)';

    replaceState(state: any, title: string, url: string, queryParams: string): void {
        super.replaceState(state, title, this.preprocessUrl(url), queryParams);
    }

    pushState(state: any, title: string, url: string, queryParams: string): void {
        super.pushState(state, title, this.preprocessUrl(url), queryParams);
    }



    preprocessUrl(url: string): string {
        console.log('preProcessUrl authLocationStrategy ', url);
        if (url.includes(AppLocationStrategy.AUX_ROUTE_SEPERATOR)) {
            if (url.split(AppLocationStrategy.AUX_ROUTE_SEPERATOR).length > 2) {
                throw new Error(
                    'Usage for more than one auxiliary route on the same level detected - please recheck imlementation'
                );
            }
            return url.split(AppLocationStrategy.AUX_ROUTE_SEPERATOR)[0].replace('(', '');
        } else {
            return url;
        }
    }
}