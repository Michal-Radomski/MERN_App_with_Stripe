import React from "react";
import {withRouter} from "react-router-dom";
import {History} from "history";

import studioBag from "../../assets/studio-bag.png";
import "./MainSection.styles.scss";

const MainSection = ({history}: {history: History}) => {
  return (
    <React.Fragment>
      <div className="main-section-container">
        <div className="main-section-middle">
          <div className="ms-m-image">
            <img src={studioBag} alt="Studio Bag" />
          </div>
          <div className="ms-m-description">
            <h2>Designed for Fashions. Crafted for Sport.</h2>
            <p>
              We make products that effortlessly transition from day to night. From the board room to the fitness studio, and
              everywhere in between, each Nomads piece is thoughtfully created to be the perfect balance of form and
              function.
            </p>
            <button className="button is-black" id="shop-now" onClick={() => history.push("/product/1")}>
              STUDIO BAG
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(MainSection);
