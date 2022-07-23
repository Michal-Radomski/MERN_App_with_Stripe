import React from "react";
import {withRouter} from "react-router-dom";
import {CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {History} from "history";

import {fetchFromAPI} from "../../../helpers";

interface Shipping extends Object {
  name: string;
  email: string;
  address: string;
}

const CustomCheckout = ({
  shipping,
  cartItems,
  history: {push},
}: {
  shipping: Shipping;
  cartItems: ShopItem[];
  history: History;
}): JSX.Element => {
  // console.log({shipping});

  const [processing, setProcessing] = React.useState<boolean>(false);
  const [error, setError] = React.useState<null | string>(null);
  const [clientSecret, setClientSecret] = React.useState<string>("");

  const stripe = useStripe();
  const elements = useElements();

  React.useEffect(() => {
    const items = cartItems.map((item: ShopItem) => ({price: item.price, quantity: item.quantity}));

    if (shipping) {
      const body = {
        cartItems: items,
        shipping: {
          name: shipping.name,
          address: {
            line1: shipping.address,
          },
        },
        description: "Payment Intent for Nomad Shop",
        receipt_email: shipping.email,
      };
      const customCheckout = async () => {
        const {clientSecret} = await fetchFromAPI("create-payment-intent", {
          body,
        });
        setClientSecret(clientSecret);
      };
      customCheckout();
    }
  }, [cartItems, shipping]);

  const handleCheckout = async () => {
    setProcessing(true);

    const payload = await stripe?.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements?.getElement(CardNumberElement) as any,
      },
    });
    if (payload?.error) {
      setError(`Payment Failed ${payload.error.message}`);
    } else {
      push("/success");
    }
  };

  const cardHandleChange = (event: {error: any}) => {
    const {error} = event;
    setError(error ? error.message : "");
  };

  const cardStyle = {
    style: {
      base: {
        color: "#000",
        fontFamily: "Roboto, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#606060",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <div>
      <h4>Enter Payment Details</h4>
      <div className="stripe-card">
        <CardNumberElement className="card-element" options={cardStyle} onChange={cardHandleChange} />
      </div>

      <div className="stripe-card">
        <CardExpiryElement className="card-element" options={cardStyle} onChange={cardHandleChange} />
      </div>

      <div className="stripe-card">
        <CardCvcElement className="card-element" options={cardStyle} onChange={cardHandleChange} />
      </div>

      <div className="submit-btn">
        <button disabled={processing} className="button is-black nomad-btn submit" onClick={() => handleCheckout()}>
          {processing ? "PROCESSING" : "PAY"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default withRouter(CustomCheckout as React.FC);
