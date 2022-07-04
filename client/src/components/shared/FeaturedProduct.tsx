import React from "react";

import "./FeaturedProduct.styles.scss";

const FeaturedProduct = (product: {title: string; imageUrl: string; price: number}): JSX.Element => {
  const {title, imageUrl, price} = product;

  return (
    <React.Fragment>
      <div className="featured-product">
        <div className="featured-image">
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

export default FeaturedProduct;
