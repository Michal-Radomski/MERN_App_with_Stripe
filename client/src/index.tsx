import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router} from "react-router-dom";

import ProductsContextProvider from "./context/products-context";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.Fragment>
    {/* <React.StrictMode> */}
    <Router>
      <ProductsContextProvider>
        <App />
      </ProductsContextProvider>
    </Router>
    {/* </React.StrictMode> */}
  </React.Fragment>
);
