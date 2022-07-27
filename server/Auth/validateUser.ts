import {Request, Response, NextFunction} from "express";

interface CustomRequest extends Request {
  currentUser: any;
}

function validateUser(req: CustomRequest, res: Response, next: NextFunction) {
  const user = req["currentUser"];
  console.log({user});
  if (!user) {
    return res.status(401).send();
  }

  next();
}

module.exports = validateUser;
