import React from "react";
import {withRouter} from "react-router-dom";
import {History} from "history";

import {CartContext} from "../../context/CartContext";
import {isInCart} from "../../helpers";
import "./FeaturedProduct.styles.scss";

const FeaturedProduct = (props: {
  title: string;
  imageUrl: string;
  price: number;
  history: History;
  id: string;
  description: string;
}): JSX.Element => {
  const {title, imageUrl, price, history, id, description} = props;

  const product = {title, imageUrl, price, history, id, description};

  const {addProduct, cartItems, increase} = React.useContext(CartContext as any);
  const itemInCart = isInCart(product, cartItems);

  return (
    <React.Fragment>
      <div className="featured-product">
        <div className="featured-image" onClick={() => history.push(`/product/${id}`)}>
          <img src={imageUrl} alt="Product" />
        </div>
        <div className="name-price">
          <h3>{title}</h3>
          <p>$ {price}</p>
          {!itemInCart && (
            <button onClick={() => addProduct(product)} className="button is-black nomad-btn">
              Add To Cart
            </button>
          )}
          {itemInCart && (
            <button onClick={() => increase(product)} className="button is-white-outline nomad-btn" id="btn-white-outline">
              Add More
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(FeaturedProduct as React.FC);
