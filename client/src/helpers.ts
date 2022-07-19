export const isInCart = (product: {id: string}, cartItems: ShopItem[]) => {
  return cartItems.find((item) => item.id === product.id);
};

const API: string = "http://localhost:5000"; //* Or URL of server (Heroku)

export async function fetchFromAPI(endpoint: string, options: Object) {
  const {method, body}: {method: string; body: any} = {method: "POST", body: null, ...options};

  // console.log({options});
  // console.log({body});

  const response = await fetch(`${API}/${endpoint}`, {
    method,
    ...(body && {body: JSON.stringify(body)}),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error(response.statusText);
  }
}
