const stripeAPI = require("stripe")(process.env.STRIPE_SECRET_KEY);
// console.log({stripeAPI});

module.exports = stripeAPI;
