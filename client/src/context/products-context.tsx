import React from "react";

import SHOP_DATA from "../shop";
// console.log({SHOP_DATA});

export const ProductsContext = React.createContext({});

const ProductsContextProvider = ({children}: {children: any}): JSX.Element => {
  console.log("children:", children, typeof children);

  const [products] = React.useState<ShopItem[]>(SHOP_DATA);

  return <ProductsContext.Provider value={{products}}>{children}</ProductsContext.Provider>;
};

export default ProductsContextProvider;
