import React from "react";
import {withRouter} from "react-router-dom";
import {History} from "history";

const Total = ({itemCount, total, history}: {itemCount: number; total: number; history: History}): JSX.Element => {
  return (
    <React.Fragment>
      <div className="total-container">
        <div className="total">
          <p>Total Items: {itemCount}</p>
          <p>{`Total: $ ${total}`}</p>
        </div>
        <div className="checkout">
          <button className="button is-black" onClick={() => history.push("/checkout")}>
            CheckOut
          </button>
          <button className="button is-white" onClick={() => {}}>
            Clear
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Total as React.FC);
