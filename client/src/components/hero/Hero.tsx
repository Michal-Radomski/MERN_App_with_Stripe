import React from "react";

import "./Hero.styles.scss";

const Hero = (): JSX.Element => {
  return (
    <React.Fragment>
      <section className="hero is-large is-info hero-image">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Bags re-imagined for life.</h1>
          </div>
          <div className="show-now-btn">
            <button className="button is-black" id="shop-now">
              Shop Now
            </button>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Hero;
