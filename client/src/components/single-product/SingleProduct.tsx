import React from "react";
import {withRouter} from "react-router-dom";
import {History} from "history";

import {isInCart} from "../../helpers";
import {ProductsContext} from "../../context/ProductsContext";
import {CartContext} from "../../context/CartContext";
import Layout from "../shared/Layout";
import "./SingleProduct.styles.scss";

const SingleProduct = ({match, history}: {match: {params: {id: string}}; history: History}): JSX.Element => {
  // console.log("match:", match);
  // console.log("history:", history);

  const {products} = React.useContext(ProductsContext);
  const {addProduct, cartItems, increase} = React.useContext(CartContext as any);
  const {id} = match.params;
  const [product, setProduct] = React.useState<ShopItem>(null!);

  React.useEffect(() => {
    const product: ShopItem | undefined = products.find((item: ShopItem) => Number(item.id) === Number(id));

    // If product does not exist, redirect to Shop Page
    if (!product) {
      return history.push("/shop");
    }
    setProduct(product);
  }, [history, id, products, product]);

  // While we check for product
  if (!product) {
    return null as any;
  }

  const itemInCart = isInCart(product as any, cartItems);

  const {imageUrl, title, price, description} = product;

  return (
    <Layout>
      <div className="single-product-container">
        <div className="product-image">
          <img src={imageUrl} alt="Product" />
        </div>
        <div className="product-details">
          <div className="name-price">
            <h3>{title}</h3>
            <p>{price}</p>
          </div>
          <div className="add-to-cart-btns">
            {!itemInCart && (
              <button className="button is-white nomad-btn" id="btn-white-outline" onClick={() => addProduct(product)}>
                Add to Cart
              </button>
            )}
            {itemInCart && (
              <button className="button is-white nomad-btn" id="btn-white-outline" onClick={() => increase(product)}>
                Add More
              </button>
            )}

            <button className="button is-black nomad-btn" id="btn-black-outline">
              Proceed to Checkout
            </button>
          </div>
          <div className="product-description">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(SingleProduct);
