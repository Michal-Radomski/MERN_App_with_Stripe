import {Request, Response} from "express";

const stripeAPI = require("../stripe");

interface CartItem {
  price: number;
  quantity: number;
}

function calculateOrderAmount(cartItems: CartItem[]) {
  return (
    cartItems.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0) * 100
  );
}

async function paymentIntent(req: Request, res: Response) {
  const {cartItems, description, receipt_email, shipping} = req.body;

  let paymentIntent;

  try {
    paymentIntent = await stripeAPI.paymentIntents.create({
      amount: calculateOrderAmount(cartItems),
      currency: "usd",
      description: description,
      payment_method_types: ["card"],
      receipt_email: receipt_email,
      shipping: shipping,
    });
    res.status(200).json({clientSecret: paymentIntent.client_secret, id: paymentIntent.id});
  } catch (error) {
    console.log(error);
    res.status(400).json({error: "An error occurred, Unable to create payment intent"});
  }
}

module.exports = paymentIntent;
