import React from "react";
import {Link} from "react-router-dom";
import {auth} from "../../firebase/index";

import {UserContext} from "../../context/UserContext";
import CartIcon from "../cart-icon/CartIcon";
import "./Header.styles.scss";

const Header = (): JSX.Element => {
  const {user} = React.useContext(UserContext as any);
  // console.log({user});

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
          {!user && (
            <li>
              <Link to="/sign-in">Sign In</Link>
            </li>
          )}
          {user && <li onClick={() => auth.signOut()}>Sign Out</li>}
          {!user && (
            <li>
              <Link to="/sign-up">Sign Up</Link>
            </li>
          )}
        </ul>
        <CartIcon />
      </nav>
    </React.Fragment>
  );
};

export default Header;
