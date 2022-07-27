export {};
import {Request, Response} from "express";

const stripeAPI = require("../stripe");
const getCustomer = require("../Helpers/getCustomer");

interface CustomRequest extends Request {
  currentUser: any;
}

async function setupIntent(req: CustomRequest, res: Response) {
  const {currentUser} = req;
  // Get Stripe Customer
  const customer = await getCustomer(currentUser.uid);
  console.log({customer});
  let setupIntent;

  try {
    setupIntent = await stripeAPI.setupIntents.create({
      customer: customer.id,
    });
    console.log({setupIntent});
    res.status(200).json(setupIntent);
  } catch (error) {
    console.log({error});
    res.status(400).json({error: "an error occurred, unable to create setup intent"});
  }
}

module.exports = setupIntent;
