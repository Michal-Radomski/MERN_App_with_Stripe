import React from "react";

import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import "./App.scss";

function App(): JSX.Element {
  return (
    <React.Fragment>
      <div className="App">
        <Header />
        <Hero />
      </div>
    </React.Fragment>
  );
}

export default App;
