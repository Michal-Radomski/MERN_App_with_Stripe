// An Interface For The Action
type Action = {type: "ADD_ITEM"; payload: ShopItem};

// An interface For The State
interface State {
  cartItems: ShopItem[];
}

export const sumItems = (cartItems: ShopItem[]) => {
  return {
    itemCount: cartItems.reduce((total: number, product: any) => total + product.quantity, 0),
    total: cartItems.reduce((total: number, product: any) => total + product.price * product.quantity, 0),
  };
};

const cartReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (!state.cartItems?.find((item: ShopItem) => item.id === action.payload.id)) {
        state?.cartItems?.push({
          ...action.payload,
          quantity: 1,
        });
      }

      return {...state, cartItems: [...state.cartItems], ...sumItems(state.cartItems)};

    default:
      return state;
  }
};

export default cartReducer;
