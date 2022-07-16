// An Interface For The Action
type Action =
  | {type: "ADD_ITEM"; payload: ShopItem}
  | {type: "INCREASE"; payload: ShopItem}
  | {type: "DECREASE"; payload: ShopItem}
  | {type: "REMOVE_ITEM"; payload: ShopItem}
  | {type: "CLEAR_CART"};

// An interface For The State
interface State {
  cartItems: ShopItem[];
}

const storeCartItems = (cartItems: ShopItem[]) => {
  const cart = cartItems.length > 0 ? cartItems : [];
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const sumItems = (cartItems: ShopItem[]) => {
  storeCartItems(cartItems);
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

    case "INCREASE":
      const increaseIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
      // @ts-ignore
      state.cartItems[increaseIndex].quantity++;
      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      };

    case "DECREASE":
      const decreaseIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
      const product = state.cartItems[decreaseIndex];
      if (product.quantity && product.quantity >= 1) {
        product.quantity--;
      }
      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      };

    case "REMOVE_ITEM":
      const newCartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
      return {
        ...state,
        cartItems: [...newCartItems],
        ...sumItems(newCartItems),
      };

    case "CLEAR_CART":
      localStorage.removeItem("cart");
      return {
        cartItems: [],
        itemCount: 0,
        total: 0,
      };

    default:
      return state;
  }
};

export default cartReducer;
