import { Injectable, ElementRef } from '@angular/core';
import * as dropin from 'braintree-web-drop-in';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BraintreeService {

  constructor(
    private httpClient:HttpClient
  ) { }


  initializeUI(submitButton: ElementRef){
    return dropin.create({
      authorization: 'sandbox_fwvs4nc5_m7gfvmm4drz9z6cf',
      container: '#dropin-container',
      dataCollector: {
        kount: true // Required if Kount fraud data collection is enabled
      },
      card:{
        cardholderName:{
          required: true
        },
        overrides: {
          fields: {
            cardholderName: {
              placeholder: 'Name on the card',
            }
          }
        }
        
      }
    }).then(function (dropinInstance) {
      submitButton.nativeElement.addEventListener('click', function () {
        dropinInstance.requestPaymentMethod().then(function (payload) {
          // Send payload.nonce to your server
          console.log('payload to server', payload);
        }).catch(function (err) {
          // Handle errors in requesting payment method
          console.log('error in payload credit ', err);
        });
      });
    }).catch(function (err) {
      // Handle any errors that might've occurred when creating Drop-in
      console.error("errors while creating droping", err);
    });
  }


  // checkout$ = this.httpClient.post()

}
