import React from "react";
import {Link} from "react-router-dom";

import CartIcon from "../cart-icon/CartIcon";
import "./Header.styles.scss";

const Header = (): JSX.Element => {
  return (
    <React.Fragment>
      <nav className="nav-menu container">
        <div className="logo">
          <Link to="/">NOMAD</Link>
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
        </ul>
        <CartIcon />
      </nav>
    </React.Fragment>
  );
};

export default Header;
