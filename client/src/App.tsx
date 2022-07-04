import React from "react";

import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import MainSection from "./components/main-section/MainSection";
import "./App.scss";

import Test from "./Test";

function App(): JSX.Element {
  return (
    <React.Fragment>
      <div className="App">
        <Header />
        <Test />
        <Hero />
        <MainSection />
      </div>
    </React.Fragment>
  );
}

export default App;
