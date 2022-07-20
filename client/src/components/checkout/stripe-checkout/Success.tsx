import React from "react";
import {withRouter} from "react-router-dom";
import {History} from "history";

import Layout from "../../shared/Layout";
import {CartContext} from "../../../context/CartContext";

const Success = ({history}: {history: History}): JSX.Element => {
  const {clearCart, cartItems} = React.useContext(CartContext as any);

  React.useEffect(() => {
    if (cartItems.length > 0) {
      clearCart();
    }
  }, [clearCart, cartItems]);

  return (
    <Layout>
      <div className="checkout">
        <h1>Thank you or your order</h1>
        <p>We are currently processing your order and will send you a confirmation email shortly</p>
        <div>
          <button className="button is-black nomad-btn submit" onClick={() => history.push("/shop")}>
            Continue Shopping
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(Success as React.FC);
