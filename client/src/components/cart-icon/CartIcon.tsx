import React from "react";

import shoppingBag from "../../assets/shopping-bag.png";
import "./CartIcon.styles.scss";

const CartIcon = (): JSX.Element => {
  return (
    <React.Fragment>
      <div className="cart-container">
        <img src={shoppingBag} alt="Shopping Cart Icon" />
        <span className="cart-count">5</span>
      </div>
    </React.Fragment>
  );
};

export default CartIcon;
