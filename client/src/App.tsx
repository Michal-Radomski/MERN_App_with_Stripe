import React from "react";

import Header from "./components/header/Header";
import "./App.scss";

function App(): JSX.Element {
  return (
    <React.Fragment>
      <div className="App">
        <Header />
      </div>
    </React.Fragment>
  );
}

export default App;
