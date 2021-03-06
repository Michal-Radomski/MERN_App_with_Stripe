import React from "react";

import cartReducer, {sumItems} from "./cartReducer";

export const CartContext = React.createContext({contextValues: {cartItems: [], itemCount: 0, total: 0}});

const cartFromLocalStorage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!) : [];

// const initialState = {cartItems: [], itemCount: 0, total: 0};
const initialState = {cartItems: cartFromLocalStorage, ...sumItems(cartFromLocalStorage)};

const CartContextProvider: React.FC<{children: JSX.Element}> = ({children}: {children: JSX.Element}) => {
  // console.log({children});

  const [state, dispatch] = React.useReducer(cartReducer, initialState as any);

  const addProduct = (product: ShopItem) => dispatch({type: "ADD_ITEM", payload: product});
  const increase = (product: ShopItem) => dispatch({type: "INCREASE", payload: product});
  const decrease = (product: ShopItem) => dispatch({type: "DECREASE", payload: product});
  const removeProduct = (product: ShopItem) => dispatch({type: "REMOVE_ITEM", payload: product});
  const clearCart = () => dispatch({type: "CLEAR_CART"});

  const contextValues = {
    ...state,
    addProduct,
    increase,
    decrease,
    removeProduct,
    clearCart,
  } as any;

  return <CartContext.Provider value={contextValues}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
