import React from "react";
import {Switch, Route} from "react-router-dom";

// import Header from "./components/header/Header";
// import Hero from "./components/hero/Hero";
// import MainSection from "./components/main-section/MainSection";
// import FeaturedCollection from "./components/featured-collection/FeaturedCollection";
// import Footer from "./components/footer/Footer";

import "./App.scss";
import HomePage from "./HomePage";
import NotFound from "./NotFound";
import Shop from "./components/pages/shop/Shop";
import SingleProduct from "./components/single-product/SingleProduct";
import CartPage from "./components/pages/cart-page/CartPage";
import Checkout from "./components/checkout/Checkout";

//* import TestClass from "./TestClass";
//* import TestFunction from "./TestFunction";

function App(): JSX.Element {
  return (
    <React.Fragment>
      {/* <>
        <div style={{backgroundColor: "red"}}>
          <TestClass />
          <TestFunction />
        </div>
      </> */}
      <div className="app">
        {/* <Header />
        <Hero />
        <MainSection />
        <FeaturedCollection />
        <Footer /> */}
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route path="/shop" component={Shop} />
          <Route path="/product/:id" component={SingleProduct} />
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={Checkout} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
