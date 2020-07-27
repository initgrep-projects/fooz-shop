import * as functions from 'firebase-functions';
import { config } from './paypal-checkout';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello lofs for foozshop!", { structuredData: true });
  response.send("Hello from foozshop!");
});


export const paypalenv = functions.https.onRequest((request, response) => {
  functions.logger.info(`paypal environment ${config.client()}`);
  response.send(`paypal environment = ${config.client()}`);
});

export const createPaypalOrder = functions.https.onRequest(async (request, response) => {
  const orderRequest = new config.paypal.orders.OrdersCreateRequest();
  orderRequest.requestBody(
    {
      "intent": "CAPTURE",
      "purchase_units": [
        {
          "amount": {
            "currency_code": "USD",
            "value": "100.00"
          }
        }
      ]
    });

    const resp = await config.client().execute(orderRequest);
    functions.logger.info(`Response: ${JSON.stringify(resp)}`);
    response.send(resp);
});

