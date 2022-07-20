export {};
import {Request, Response} from "express";

const stripeAPI = require("../stripe");

const webHookHandlers = {
  "checkout.session.completed": (data: Object) => {
    console.log("Checkout completed successfully", data);
    //* Here can be other business logic
  },

  "payment_intent.succeeded": (data: Object) => {
    console.log("Payment succeeded", data);
  },
  "payment_intent.payment_failed": (data: Object) => {
    console.log("Payment Failed", data);
  },
} as any;

function webhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripeAPI.webhooks.constructEvent(req["rawBody"], sig, process.env.WEB_HOOK_SECRET);
  } catch (error) {
    return res.status(400).send(`Webhook error ${(error as any).message}`);
  }

  if (webHookHandlers[event.type]) {
    webHookHandlers[event.type](event.data.object);
  }
}

module.exports = webhook;
