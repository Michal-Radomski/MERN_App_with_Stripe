import React from "react";

import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import MainSection from "./components/main-section/MainSection";
import "./App.scss";

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
      <div className="App">
        <Header />
        <Hero />
        <MainSection />
      </div>
    </React.Fragment>
  );
}

export default App;
