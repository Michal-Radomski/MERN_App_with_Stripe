import React from "react";

import {ProductsContext} from "../../../context/ProductsContext";
import FeaturedProduct from "../../shared/FeaturedProduct";
import Layout from "../../shared/Layout";
import "./Shop.styles.scss";

const Shop = (): JSX.Element => {
  const {products} = React.useContext(ProductsContext as any);
  const allProducts = products.map((product: ShopItem) => <FeaturedProduct {...product} key={product.id} />);

  return (
    <Layout>
      <div className="product-list-container">
        <h2 className="product-list-title">Shop</h2>
        <div className="product-list">{allProducts}</div>
      </div>
    </Layout>
  );
};

export default Shop;
