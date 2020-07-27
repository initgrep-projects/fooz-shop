import * as functions from 'firebase-functions';
import { config } from './paypal-checkout';
import { gateway } from './brainTree';
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

export const client_token = functions.https.onRequest((request, response) => {
  gateway.clientToken.generate({}, (err: any, resp: { clientToken: any; }) => {
    response.send({ token: resp.clientToken })
  });
});

export const checkout = functions.https.onRequest((request, response) => {
  if (request.method !== 'POST') {
    response.contentType('application/json').status(400).send({ error: 'INVALID METHOD', message: '/checkout only suppports POST requests' });
  } else {
    // response.contentType('application/json').send(request.body);
    const nonceFromTheClient = request.body.nonce;
    const deviceDataFromTheClient = request.body.deviceData;
    gateway.transaction.sale({
      amount: "10.00",
      paymentMethodNonce: nonceFromTheClient,
      deviceData: deviceDataFromTheClient,
      options: {
        submitForSettlement: true
      }
    }, function (err: any, result: any) {
        if(err){
          response.contentType('application/json').status(400).send({error: err});
        }else{
          response.contentType('application/json').send({result: result});
        }
    });
  }
});


