import * as functions from 'firebase-functions';
import * as express from 'express';
import * as brainTreeApi from './payment/brainTree.api';
const cors = require('cors')({origin: true});

const app = express();

app.disable("x-powered-by");
app.use(cors);

app.use('/pay', brainTreeApi.brainTreeRouter)

export const api = functions.https.onRequest(app);


