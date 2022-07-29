import {Request, Response} from "express";
const stripeAPI = require("../stripe");

// console.log({stripeAPI});

async function createCheckOutSession(req: Request, res: Response) {
  const domainUrl = process.env.WEB_APP_URL;
  const {line_items, customer_email} = req.body;

  // Check req body has line_items and email address
  if (!line_items || !customer_email) {
    return res.status(400).json({error: "Missing Required Session Parameters"});
  }
  let session;
  // console.log({session});

  try {
    session = await stripeAPI.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: line_items,
      customer_email: customer_email,
      success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainUrl}/canceled`,
      shipping_address_collection: {allowed_countries: ["PL"]},
    });
    // console.log({session});
    res.status(200).json({sessionId: session.id});
  } catch (error) {
    console.log({error});
    res.status(400).json({error: "An Error Occurred, Unable to Create a Session"});
  }
}

module.exports = createCheckOutSession;
