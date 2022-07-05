import React from "react";

import Header from "../header/Header";
import Footer from "../footer/Footer";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const Layout: React.FC<Props> = ({children}) => {
  console.log({children}, typeof children);

  return (
    <React.Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
