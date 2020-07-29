import { Injectable, ElementRef } from '@angular/core';
import * as dropin from 'braintree-web-drop-in';
import { HttpClient } from '@angular/common/http';
import { defer, fromEvent, of } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BraintreeService {
  dropInInstance: any;
  token$ = this.httpClient.get<{ token: string }>(environment.payment.clientTokenUrl);

  constructor(
    private httpClient: HttpClient
  ) { }


  // initiateDropInUI$ = this.token$
  //   .pipe(
  //     map(result => this.getDropinConfig(result.token)),
  //     switchMap(config => this.generateUI$(config))
  //   )

  initiateDropInUI$ = of({ token: 'sandbox_fwvs4nc5_m7gfvmm4drz9z6cf' })
    .pipe(
      map(result => this.getDropinConfig(result.token)),
      switchMap(config => this.generateUI$(config))
    );

  private generateUI$(config) {
    return defer(async () => {
      const instance = await dropin.create(config);
      return instance;
    }).pipe(
      tap(instance => this.dropInInstance = instance)
    );
  }

  requestPaymentMethodNonce$ = defer(async () => {
    const payload = await this.dropInInstance.requestPaymentMethod();
    console.log('isRequestable ', this.dropInInstance.isPaymentMethodRequestable());
    return payload;
  });

  /**
   *  on constructor of this service, get the client token
   *  requestPaymentNonce$ using client token, provide the customer id also
   *  send the iniitiate payment to client
   *      provide nonce and device ddata amount calculated, cart-item ids, customer id, currency qar,
   *      coupon code
   *      
   * 
   * on server,
   * calculate amount from cart items quantity,
   * validate
   * take server one if not match
   * 
   *  
   */
  // initiatePayment$

  tearDown() {
    this.dropInInstance.teardown((r, e) => {
      console.log('teardown called', r, e);
    });
  }





  private getDropinConfig(token: string) {
    return {
      authorization: token || 'sandbox_fwvs4nc5_m7gfvmm4drz9z6cf',
      container: '#dropin-container',
      dataCollector: {
        kount: true // Required if Kount fraud data collection is enabled
      },
      card: {
        cardholderName: {
          required: true
        },
        overrides: {
          fields: {
            number: {
              maskInput: {
                showLastFour: true
              }
            },
            cvv: {
              maskInput: true
            }
          }
        }
      }
    }
  }

}
