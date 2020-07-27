
const paypalCheckout  = require ('@paypal/checkout-server-sdk');   

 class PaypalConfig{
    private clientId:string = process.env.PAYPAL_CLIENT_ID || 'AfS_eZMpqRfQeSRN5QSMKuPnK50CpXzWo19H-ff6wkPX0CRGXzzYOc0ZhqXYwaK-PwRL_GPUfkeMknD5';
    private clientSecret:string = process.env.PAYPAL_CLIENT_SECRET || 'EGK7XD-SMQLdpM7whFKvixvSym5w7kJ6_9Yt0bIyHiiOdGBLe2zrcZiZEKhnjccoPOPhit8XjrFiaIRw';
    paypal = paypalCheckout;
    client() {
        return new paypalCheckout.core.PayPalHttpClient(this.environment());
    }

    environment() {
        return new paypalCheckout.core.SandboxEnvironment(this.clientId, this.clientSecret);
    }

}

export const config = new PaypalConfig();
