const braintree = require('braintree');

export const gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "m7gfvmm4drz9z6cf",
    publicKey: "46xpv8t2dkr3hfbv",
    privateKey: "64faa5d353b89b156469da88046cb331"
  });
