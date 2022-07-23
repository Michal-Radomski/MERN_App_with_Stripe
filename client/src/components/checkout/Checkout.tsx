import React from "react";

import {CartContext} from "../../context/CartContext";
import Layout from "../shared/Layout";
// import StripeCheckout from "./stripe-checkout/StripeCheckout";
import ShippingAddress from "./custom-checkout/ShippingAddress";
import CustomCheckout from "./custom-checkout/CustomCheckout";
import "./Checkout.styles.scss";

const Checkout = (): JSX.Element => {
  const {itemCount, total, cartItems} = React.useContext(CartContext as any);

  const [shipping, setShipping] = React.useState(null as any);

  const addressShown = {
    display: shipping ? "none" : "block",
  };

  const cardShown = {
    display: shipping ? "block" : "none",
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
        <div style={cardShown}>
          <CustomCheckout {...{shipping, cartItems}} />
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
