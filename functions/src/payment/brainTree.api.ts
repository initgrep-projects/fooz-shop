import * as express from 'express';
import { brainTreeService } from './brainTree.service';
import { logger } from 'firebase-functions';

/**
 * express router to create the apis.
 */
const theRouter = express.Router();

/**
 * fetch the client token
 */
theRouter.get('/client_token', async (request: express.Request, response: express.Response) => {
    try {
        const token = await brainTreeService.generateToken();
        response.contentType('application/json').send({ token: token });
    } catch (e) {
        response.contentType('application/json').status(400).send({ error: e });
    }

});

/**
 * create a sale.
 */
theRouter.post('/sale', async (request, response) => {
    try {
        logger.info('/sale called ');
        const nonceFromTheClient = request.body.nonce;
        const deviceDataFromTheClient = request.body.deviceData;
        const result = await brainTreeService.createSale(nonceFromTheClient, deviceDataFromTheClient);
        response.contentType('application/json').send({ result: result });
    } catch (e) {
        logger.error('error happened in /sale endpoint', e);
        response.contentType('application/json').status(400).send({ error: e });
    }
});



export const brainTreeRouter = theRouter;




