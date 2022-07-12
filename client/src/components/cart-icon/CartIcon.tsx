import React from "react";

import shoppingBag from "../../assets/shopping-bag.png";
import {CartContext} from "../../context/CartContext";
import "./CartIcon.styles.scss";

const CartIcon = (): JSX.Element => {
  const {itemCount} = React.useContext(CartContext) as any;
  console.log({itemCount});

  return (
    <React.Fragment>
      <div className="cart-container">
        <img src={shoppingBag} alt="Shopping Cart Icon" />
        {itemCount > 0 ? <span className="cart-count">{itemCount}</span> : null}
      </div>
    </React.Fragment>
  );
};

export default CartIcon;
