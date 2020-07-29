import { logger } from 'firebase-functions';
import { gateway } from './brainTree.config';

/** singelton instance */
class BrainTreeService {
    private static instance: BrainTreeService;
    private constructor() { }

    public static getInstance(): BrainTreeService {
        if (!BrainTreeService.instance) {
            BrainTreeService.instance = new BrainTreeService();
        }
        return BrainTreeService.instance;
    }

    /**
     * generate token.
     * returning a promise token after calling the gateway
     */
    generateToken(): Promise<any> {
        logger.info('client_token called ');
        return new Promise((resolve, reject) => {
            gateway.clientToken.generate({},
                (err: any, result: { clientToken: any; }) => {
                    if (!err) {
                        resolve(result.clientToken);
                    } else {
                        reject(err);
                    }
                });
        });
    }

    /**
     *  @Note: amount has to be a parameter calculated out of the value of all items purchased.
     *         Just kept 10.00 as an example
     * @param nonce nonce from user approval
     * @param deviceData device data if enabled *optional
     */
    createSale(nonce: string, deviceData: string): Promise<any> {
        logger.info('createSale called ', nonce, deviceData);
        return new Promise((resolve, reject) => {
            gateway.transaction.sale({
                amount: "10.00",
                paymentMethodNonce: nonce,
                deviceData: deviceData,
                options: {
                    submitForSettlement: true
                }
            }, function (err: any, result: any) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

}

export const brainTreeService = BrainTreeService.getInstance();

