import express, {Request, Response} from "express";
const cors = require("cors");
require("dotenv").config({path: "./.env"});

const app = express();

app.use(express.json());
app.use(cors({origin: true}));

app.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("<h1>Hello World!</h1>");
});

const port = (process.env.PORT || 5000) as number;
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
