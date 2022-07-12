import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router} from "react-router-dom";

import ProductsContextProvider from "./context/ProductsContext";
import CartContextProvider from "./context/CartContext";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.Fragment>
    {/* <React.StrictMode> */}
    <Router>
      <ProductsContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </ProductsContextProvider>
    </Router>
    {/* </React.StrictMode> */}
  </React.Fragment>
);
