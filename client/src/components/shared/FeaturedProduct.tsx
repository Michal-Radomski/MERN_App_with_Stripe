import React from "react";
import {withRouter} from "react-router-dom";
import {History} from "history";

import "./FeaturedProduct.styles.scss";

const FeaturedProduct = (props: {
  title: string;
  imageUrl: string;
  price: number;
  history: History;
  id: string;
}): JSX.Element => {
  const {title, imageUrl, price, history, id} = props;

  return (
    <React.Fragment>
      <div className="featured-product">
        <div className="featured-image" onClick={() => history.push(`/product/${id}`)}>
          <img src={imageUrl} alt="Product" />
        </div>
        <div className="name-price">
          <h3>{title}</h3>
          <p>$ {price}</p>
          <button className="button is-black nomad-btn">Add To Cart</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(FeaturedProduct as React.FC);
