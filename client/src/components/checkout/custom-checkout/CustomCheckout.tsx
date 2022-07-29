import React from "react";
import {withRouter} from "react-router-dom";
import {CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {History} from "history";

import {fetchFromAPI} from "../../../helpers";
import {UserContext} from "../../../context/UserContext";
import {StripeCardNumberElement} from "@stripe/stripe-js";

interface Shipping extends Object {
  name: string;
  email: string;
  address: string;
}

interface Card {
  card: {brand: string; last4: number; exp_month: number; exp_year: number};
  id: string;
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
  const {user} = React.useContext(UserContext as any);
  // console.log({UserContext});
  // console.log({user});

  const [processing, setProcessing] = React.useState<boolean>(false);
  const [error, setError] = React.useState<null | string>(null);
  const [clientSecret, setClientSecret] = React.useState<string>("");
  const [cards, setCards] = React.useState<null | Card[]>(null);
  const [payment, setPaymentCard] = React.useState<string>("");
  const [saveCard, setSavedCard] = React.useState<boolean>(false);
  const [paymentIntentId, setPaymentIntentId] = React.useState<null | string>(null);

  // console.log({cards});

  const stripe = useStripe();
  const elements = useElements();

  React.useEffect(() => {
    const items = cartItems.map((item: ShopItem) => ({price: item.price, quantity: item.quantity}));

    if (user) {
      const savedCards = async () => {
        try {
          const cardsList = await fetchFromAPI("get-payment-methods", {
            method: "GET",
          });
          setCards(cardsList);
        } catch (error) {
          console.log({error});
        }
      };
      savedCards();
    }

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
        const {clientSecret, id} = await fetchFromAPI("create-payment-intent", {
          body,
        });
        setClientSecret(clientSecret);
        setPaymentIntentId(id);
      };
      customCheckout();
    }
  }, [cartItems, shipping, user]);

  const handleCheckout = async () => {
    setProcessing(true);

    let setupIntent;
    // Check if User Has Selected to Save Card
    if (saveCard) {
      // Create a Setup Intent
      setupIntent = await fetchFromAPI("save-payment-method");
    }

    const payload = await stripe?.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements?.getElement(CardNumberElement) as any,
      },
    });
    if (payload?.error) {
      setError(`Payment Failed ${payload.error.message}`);
    } else {
      if (saveCard && setupIntent) {
        // Send the Customers Card Details to be Saved with Stripe
        await stripe?.confirmCardSetup(setupIntent.client_secret, {
          payment_method: {
            card: elements?.getElement(CardNumberElement) as StripeCardNumberElement,
          },
        });
      } else {
        push("/success");
      }

      push("/success");
    }
  };

  const savedCardCheckout = async () => {
    setProcessing(true);
    // Update the Payment Intent to Include the Customer Parameter
    const {clientSecret} = await fetchFromAPI("update-payment-intent", {
      body: {paymentIntentId},
      method: "PUT",
    });

    const payload = await stripe?.confirmCardPayment(clientSecret, {
      payment_method: payment,
    });

    if (payload?.error) {
      setError(`Payment Failed: ${payload.error.message}`);
      setProcessing(false);
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

  let cardOption;

  if (cards) {
    cardOption = cards.map((card: Card) => {
      const {
        card: {brand, last4, exp_month, exp_year},
      } = card;
      return (
        <option key={card.id} value={card.id}>
          {`${brand}/ **** **** **** ${last4} ${exp_month}/${exp_year}`}
        </option>
      );
    });
    cardOption.unshift(
      <option key="Select a Card" value="">
        Select A Card
      </option>
    );
  }

  return (
    <div>
      {user && cards && cards.length > 0 && (
        <div>
          <h4>Pay with Saved Card</h4>
          <select
            value={payment}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setPaymentCard(event.target.value)}
          >
            {cardOption}
          </select>
          <button
            type="submit"
            disabled={processing || !payment}
            className="button is-black nomad-btn submit saved-card-btn"
            onClick={() => savedCardCheckout()}
          >
            {processing ? "PROCESSING" : "PAY WITH SAVED CARD"}
          </button>
        </div>
      )}

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

      {user && (
        <div className="save-card">
          <label>Save Card</label>
          <input
            type="checkbox"
            checked={saveCard}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSavedCard(event.target.checked)}
          />
        </div>
      )}

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
