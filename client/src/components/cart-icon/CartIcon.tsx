import React from "react";
import {withRouter} from "react-router-dom";
import {History} from "history";

import shoppingBag from "../../assets/shopping-bag.png";
import {CartContext} from "../../context/CartContext";
import "./CartIcon.styles.scss";

const CartIcon = ({history}: {history: History}): JSX.Element => {
  const {itemCount, cartItems} = React.useContext(CartContext as any);
  console.log({itemCount});
  console.log({cartItems});

  return (
    <React.Fragment>
      <div className="cart-container" onClick={() => history.push("/cart")}>
        <img src={shoppingBag} alt="Shopping Cart Icon" />
        {itemCount > 0 ? <span className="cart-count">{itemCount}</span> : null}
      </div>
    </React.Fragment>
  );
};

export default withRouter(CartIcon);
