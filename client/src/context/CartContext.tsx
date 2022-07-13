import React from "react";

import cartReducer from "./cartReducer";

export const CartContext = React.createContext({contextValues: {cartItems: [], itemCount: 0, total: 0}});

const initialState = {cartItem: [], itemCount: 0, total: 0};

const CartContextProvider: React.FC<{children: any}> = ({children}: {children: any}) => {
  console.log({children});

  const [state, dispatch] = React.useReducer(cartReducer, initialState as any);

  const addProduct = (product: ShopItem) => (dispatch as any)({type: "ADD_ITEM", payload: product});

  const contextValues = {
    ...state,
    addProduct,
  } as any;

  return <CartContext.Provider value={{contextValues}}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
