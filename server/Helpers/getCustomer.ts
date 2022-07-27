export {};
const stripeAPI = require("../stripe");
const firebase = require("../firebase");

async function createCustomer(userId: string) {
  const userSnapshot = await firebase.db.collection("users").doc(userId).get();

  const {email} = userSnapshot.data();

  const customer = await stripeAPI.customers.create({
    email: email,
    metadata: {
      firebaseUID: userId,
    },
  });

  console.log({customer});

  await userSnapshot.ref.update({stripeCustomerId: customer.id});
  return customer;
}

async function getCustomer(userId: string) {
  const userSnapshot = await firebase.db.collection("users").doc(userId).get();
  const {stripeCustomerId} = userSnapshot.data();
  if (!stripeCustomerId) {
    return createCustomer(userId);
  }

  const customer = await stripeAPI.customers.retrieve(stripeCustomerId);
  console.log({customer});

  return customer;
}

module.exports = getCustomer;
