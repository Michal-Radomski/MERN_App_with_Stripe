import React from "react";
import {Link} from "react-router-dom";

import "./header.styles.scss";

const Header = () => {
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
      </nav>
    </React.Fragment>
  );
};

export default Header;
