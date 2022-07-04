import React from "react";

import {ProductsContext} from "../../context/ProductsContext";
import FeaturedProduct from "../shared/FeaturedProduct";

const FeaturedCollection = (): JSX.Element => {
  const {products} = React.useContext(ProductsContext);
  const productItems = products
    .filter((_product: ShopItem, index: number) => index < 4)
    .map((product: ShopItem) => <FeaturedProduct {...product} key={product.id} />);

  return (
    <div className="featured-collection container">
      <h2 className="featured-section-title">Featured Collection</h2>
      <div className="products">{productItems}</div>
    </div>
  );
};

export default FeaturedCollection;
