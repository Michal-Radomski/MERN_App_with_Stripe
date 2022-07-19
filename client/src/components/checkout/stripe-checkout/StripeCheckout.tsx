import React from "react";
import {useStripe} from "@stripe/react-stripe-js";

import {CartContext} from "../../../context/CartContext";
import {fetchFromAPI} from "../../../helpers";

const StripeCheckout = (): JSX.Element => {
  const [email, setEmail] = React.useState<string>("");
  const {cartItems} = React.useContext(CartContext as any);

  const stripe = useStripe();

  const handleGuestCheckout = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const line_items = cartItems.map((item: ShopItem) => {
      return {
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: item.price * 100, // Amount is in Cents
          product_data: {
            name: item.title,
            description: item.description,
            images: [item.imageUrl],
          },
        },
      };
    });

    const response = await fetchFromAPI("create-checkout-session", {
      body: {line_items: line_items, customer_email: email},
    });

    const {sessionId} = response;

    // @ts-ignore
    const {error} = await stripe?.redirectToCheckout({
      sessionId: sessionId,
    });
    if (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleGuestCheckout}>
      <div>
        <input
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          value={email}
          className="nomad-input"
        />
      </div>
      <div className="submit-btn">
        <button type="submit" className="button is-black nomad-btn submit">
          Checkout
        </button>
      </div>
    </form>
  );
};

export default StripeCheckout;
