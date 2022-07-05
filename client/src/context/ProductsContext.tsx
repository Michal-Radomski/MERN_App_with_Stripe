import React from "react";

import SHOP_DATA from "../shop";
// console.log({SHOP_DATA});

export const ProductsContext = React.createContext({products: SHOP_DATA});

const ProductsContextProvider: React.FC<{children: any}> = ({children}: {children: any}) => {
  // console.log("children:", children, typeof children);

  const [products] = React.useState<ShopItem[]>(SHOP_DATA);

  return <ProductsContext.Provider value={{products}}>{children}</ProductsContext.Provider>;
};

export default ProductsContextProvider;
