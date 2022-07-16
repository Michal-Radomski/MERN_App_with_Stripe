import React from "react";

import {PlusCircleIcon, MinusCircleIcon, TrashIcon} from "../../icons";

const CartItem = (props: {
  title: string;
  imageUrl: string;
  price: number;
  quantity: number;
  increase: (arg0: ShopItem) => void;
  decrease: (arg0: ShopItem) => void;
  id: number;
  description: string;
  removeProduct: (arg0: ShopItem) => void;
}): JSX.Element => {
  const {title, imageUrl, price, quantity, increase, decrease, id, description, removeProduct} = props;
  const product = {title, imageUrl, price, quantity, id, description};

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
          <button className="btn-increase" onClick={() => increase(product)}>
            <PlusCircleIcon width="20px" />
          </button>
          {quantity >= 0 && (
            <button className="btn-trash" onClick={() => removeProduct(product)}>
              <TrashIcon width="20px" />
            </button>
          )}
          {quantity >= 1 && (
            <button className="btn-decrease" onClick={() => decrease(product)}>
              <MinusCircleIcon width="20px" />
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CartItem;
