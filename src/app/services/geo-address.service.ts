import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take, retry, tap, map, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';


export interface Country {
  country_name: string;
  country_short_name: string;
  country_phone_code: number;

}
export interface State {
  state_name: string;
}

export interface City {
  city_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class GeoAddressService {
  currentToken: string = '';

  constructor(private httpClient: HttpClient) {}

  searchCountry(term: string): Observable<string[]> {
    return this.getEndPointResults<Country>(environment.geoAddress.countriesUrl)
      .pipe(
        map(countries => {
          return countries
            .filter(c => this.isMatched(c.country_name, term))
            .map(c => c.country_name);
        })
      );
  }

  
  getCountries(): Observable<Country[]> {
    return this.getEndPointResults<Country>(environment.geoAddress.countriesUrl);
  }

  

  searchState(country: string, term: string): Observable<string[]> {
    return this.getEndPointResults<State>(environment.geoAddress.statesUrl + country)
      .pipe(
        map(states => {
          return states
            .filter(c => this.isMatched(c.state_name, term))
            .map(c => c.state_name);
        })
      );
  }

  searchCity(state: string, term: string): Observable<string[]> {
    return this.getEndPointResults<City>(environment.geoAddress.cityUrl + state)
      .pipe(
        take(1),
        map(city => {
          return city
            .filter(c => this.isMatched(c.city_name, term))
            .map(c => c.city_name);
        })
      );
  }


  private isMatched(state: string, t: string) {
    const c = state.toLowerCase();
    const term = t.toLowerCase();
    return (c.indexOf(term) !== -1);
  }

  private getEndPointResults<T>(url: string): Observable<T[]> {
    return this.getToken()
      .pipe(
        switchMap(token => {
          return this.httpClient
            .get<T[]>(
              url,
              {
                headers: new HttpHeaders({
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${token}`
                })
              }
            )
        }));
  }

  private getToken(): Observable<string> {
    if (this.currentToken) {
      return of(this.currentToken);
    } else {
      return this.token$.pipe(map(tokenObj => tokenObj.auth_token))
    }
  }

  private token$ = this.httpClient
    .get(
      environment.geoAddress.accessTokenUrl,
      {
        headers: new HttpHeaders({
          "Accept": "application/json",
          "api-token": environment.geoAddress.apiToken,
          "user-email": environment.geoAddress.userEmail
        })
      }
    )
    .pipe(
      take(1),
      retry(3),
      map((obj: { auth_token: string }) => obj),
      tap(obj => {
        this.currentToken = obj.auth_token;
      })

    );



}
