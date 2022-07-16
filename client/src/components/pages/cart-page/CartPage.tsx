import React from "react";

import {CartContext} from "../../../context/CartContext";
import Layout from "../../shared/Layout";
import CartItem from "./CartItem";
import "./CartPage.styles.scss";
import Total from "./Total";

const CartPage = (): JSX.Element => {
  const {cartItems, itemCount, total, increase, decrease, removeProduct, clearCart} = React.useContext(CartContext as any);
  const funcs = {increase, decrease, removeProduct};

  console.log({cartItems});

  // const alertTest = () => {
  //   alert("Alert - test");
  //   console.log("Alert - test");
  // };

  return (
    <Layout>
      <>
        {/* <button onClick={() => alertTest()}>Hello 1</button>
        <button onClick={alertTest}>Hello 2</button> */}

        <h1>Cart</h1>
        {cartItems.length === 0 ? (
          <div className="empty-cart">Your Cart is Empty</div>
        ) : (
          <>
            <div className="cart-page">
              <div className="cart-item-container">
                {cartItems.map(
                  (item: {
                    title: string;
                    imageUrl: string;
                    price: number;
                    quantity: number;
                    id: number;
                    description: string;
                  }) => (
                    <CartItem key={item.id} {...item} {...funcs} />
                  )
                )}
              </div>
              {/* @ts-ignore */}
              <Total itemCount={itemCount} total={total} clearCart={clearCart} />
            </div>
          </>
        )}
      </>
    </Layout>
  );
};

export default CartPage;
