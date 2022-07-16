import React from "react";

import {PlusCircleIcon, MinusCircleIcon, TrashIcon} from "../../icons";

const CartItem = (product: {title: string; imageUrl: string; price: number; quantity: number}): JSX.Element => {
  const {title, imageUrl, price, quantity} = product;

  return (
    <React.Fragment>
      <div className="cart-item">
        <div className="name-price">
          <img src={imageUrl} alt="product" />
        </div>
        <div className="name-price">
          <h4>{title}</h4>
          <p>$ {price}</p>
        </div>
        <div className="quantity">
          <p>{`Quantity: ${quantity}`}</p>
        </div>
        <div className="btns-container">
          <button className="btn-increase">
            <PlusCircleIcon width="20px" />
          </button>
          {quantity >= 1 && (
            <button className="btn-trash">
              <TrashIcon width="20px" />
            </button>
          )}
          {quantity > 1 && (
            <button className="btn-decrease">
              <MinusCircleIcon width="20px" />
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CartItem;
