import React from "react";

import {CartContext} from "../../context/CartContext";
import Layout from "../shared/Layout";
// import StripeCheckout from "./stripe-checkout/StripeCheckout";
import ShippingAddress from "./custom-checkout/ShippingAddress";
import "./Checkout.styles.scss";

const Checkout = (): JSX.Element => {
  const {itemCount, total} = React.useContext(CartContext as any);

  const [shipping, setShipping] = React.useState({});

  const addressShown = {
    display: shipping ? "none" : "block",
  };

  return (
    <Layout>
      <div className="checkout">
        <h2>Checkout Summary</h2>
        <h3>{`Total Items: ${itemCount}`}</h3>
        <h4>{`Amount to Pay: $ ${total}`}</h4>
        {/* <StripeCheckout /> */}
        <div style={addressShown}>
          <ShippingAddress setShipping={setShipping} />
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
