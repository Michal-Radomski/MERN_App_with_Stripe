import React from "react";
import "./Footer.styles.scss";

const Footer = (): JSX.Element => {
  const year = new Date().getFullYear();
  return (
    <React.Fragment>
      <div className="footer">{year} © NOMAD Store</div>
    </React.Fragment>
  );
};

export default Footer;
