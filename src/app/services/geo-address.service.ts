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

@Injectable({
  providedIn: 'root'
})
export class GeoAddressService {
  currentToken: string = '';

  constructor(private httpClient: HttpClient) {
  }




  searchCountry(term: string): Observable<string[]> {
    return this.getToken()
      .pipe(
        switchMap(token => {
          return this.httpClient
            .get<Country[]>(
              environment.geoAddress.countriesUrl,
              {
                headers: new HttpHeaders({
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${token}`
                })
              }
            )
        }),
        take(1),
        map(countries => {
          return countries
            .filter(c => this.isMatch(c, term))
            .map(c => c.country_name);
        })
      )

  }

  private isMatch(country: Country, t: string) {
    const c = country.country_name.toLowerCase();
    const s = country.country_short_name.toLowerCase();
    const term = t.toLowerCase();
    return (c.indexOf(term) !== -1 || s === term);
  }

  getToken(): Observable<string> {
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
        console.log('token fetched for address', obj.auth_token);
      })

    );



}
