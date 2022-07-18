import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router} from "react-router-dom";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

import ProductsContextProvider from "./context/ProductsContext";
import CartContextProvider from "./context/CartContext";
import App from "./App";

const stripeKey = process.env.REACT_APP_PUBLISHABLE_STRIPE_KEY as string;
// console.log({stripeKey});

const stripePromise = loadStripe(stripeKey);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.Fragment>
    {/* <React.StrictMode> */}
    <Router>
      <ProductsContextProvider>
        <CartContextProvider>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </CartContextProvider>
      </ProductsContextProvider>
    </Router>
    {/* </React.StrictMode> */}
  </React.Fragment>
);
