export {};
import {Request, Response} from "express";

const stripeAPI = require("../stripe");
const getCustomer = require("../Helpers/getCustomer");

interface CustomRequest extends Request {
  currentUser: {uid: string};
}

async function getCards(req: CustomRequest, res: Response) {
  const {currentUser} = req;
  const customer = await getCustomer(currentUser.uid);
  // console.log({currentUser});
  // console.log({customer});

  let cards;

  try {
    cards = await stripeAPI.paymentMethods.list({
      customer: customer.id,
      type: "card",
    });
    res.status(200).json(cards.data);
  } catch (error) {
    console.log({error});
    res.status(400).json({error: "An error occurred, Unable to get cards"});
  }
}

module.exports = getCards;
