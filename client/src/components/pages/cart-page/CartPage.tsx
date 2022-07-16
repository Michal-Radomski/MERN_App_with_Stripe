import React from "react";

import {CartContext} from "../../../context/CartContext";
import Layout from "../../shared/Layout";
import CartItem from "./CartItem";
import "./CartPage.styles.scss";
import Total from "./Total";

const CartPage = (): JSX.Element => {
  const {cartItems, itemCount, total} = React.useContext(CartContext as any);
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
                {cartItems.map((item: {title: string; imageUrl: string; price: number; quantity: number; id: number}) => (
                  <CartItem key={item.id} {...item} />
                ))}
              </div>
              {/* @ts-ignore */}
              <Total itemCount={itemCount} total={total} />
            </div>
          </>
        )}
      </>
    </Layout>
  );
};

export default CartPage;
