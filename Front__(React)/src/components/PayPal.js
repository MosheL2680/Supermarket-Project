import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';


const Pay = () => {
  const paypalOptions = {
    'client-id': "AUTlrZZv8vhrmzH5pWj9SlnXWAwaRoADtv8LGD3EwZC9htHEz9zX-PEGTbgHt-cyMxQqga0ga1y5C2Zg", // Replace with your actual PayPal client ID
    currency: 'USD',
  };


  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: 10 // Replace with the amount you want to charge
          },
        },
      ],
    });
  };


  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      // Handle successful payment
      console.log(details);
    });
  };


  const onError = (err) => {
    // Handle errors
    console.error(err);
  };


  return (
    <PayPalScriptProvider options={paypalOptions}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};


export default Pay;
