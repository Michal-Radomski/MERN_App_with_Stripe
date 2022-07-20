import React from "react";
import {withRouter} from "react-router-dom";
import {History} from "history";

import Layout from "../../shared/Layout";

const Canceled = ({history}: {history: History}): JSX.Element => {
  return (
    <React.Fragment>
      <Layout>
        <div className="checkout">
          <h1>Payment failed</h1>
          <p>Payment was not successful</p>
          <div>
            <button className="button is-black nomad-btn submit" onClick={() => history.push("/shop")}>
              Continue Shopping
            </button>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default withRouter(Canceled as React.FC);
