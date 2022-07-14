export const isInCart = (product: {id: string}, cartItems: ShopItem[]) => {
  return cartItems.find((item) => item.id === product.id);
};
