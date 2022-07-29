export {};
import {Request, Response} from "express";

const stripeAPI = require("../stripe");
const getCustomer = require("../Helpers/getCustomer");

interface CustomRequest extends Request {
  currentUser: {uid: string};
}

async function updatePaymentIntent(req: CustomRequest, res: Response) {
  const {
    currentUser,
    body: {paymentIntentId},
  } = req;

  const customer = await getCustomer(currentUser.uid);
  // console.log({customer});

  let paymentIntent;

  try {
    paymentIntent = await stripeAPI.paymentIntents.update(paymentIntentId, {customer: customer.id});
    res.status(200).json({clientSecret: paymentIntent.client_secret});
  } catch (error) {
    console.log(error);
    res.status(400).json({error: "Unable to update payment intent"});
  }
}

module.exports = updatePaymentIntent;
