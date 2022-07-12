import React from "react";

import cartReducer from "./cartReducer";

export const CartContext = React.createContext({contextValues: {cartItem: [], itemCount: 0, total: 0}});

const initialState = {cartItem: [], itemCount: 0, total: 0};

const CartContextProvider: React.FC<{children: any}> = ({children}: {children: any}) => {
  console.log({children});
  const [state, dispatch] = React.useReducer(cartReducer, initialState);

  const contextValues = {
    ...state,
  } as any;

  return <CartContext.Provider value={{contextValues}}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
