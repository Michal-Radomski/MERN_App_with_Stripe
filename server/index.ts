import express, {Request, Response} from "express";
const cors = require("cors");
require("dotenv").config({path: "./.env"});
const createCheckOutSession = require("./API/checkout");
const webhook = require("./API/webhook");
const paymentIntent = require("./API/paymentIntent");
const decodeJWT = require("./Auth/decodeJWT");
// const validateUser = require('./auth/validateUser');
declare module "http" {
  interface IncomingMessage {
    rawBody: any;
  }
}

const app = express();

app.use(
  express.json({
    verify: (request: Request, _response: Response, buffer: Buffer) => (request["rawBody"] = buffer),
  })
);
app.use(cors({origin: true}));

app.use(decodeJWT);

app.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("<h1>Hello World!</h1>");
});

app.post("/create-checkout-session", createCheckOutSession);

app.post("/webhook", webhook);

app.post("/create-payment-intent", paymentIntent);

const port = (process.env.PORT || 5000) as number;
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
