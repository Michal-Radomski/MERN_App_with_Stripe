const firebase = require("../firebase");
import {Request, Response, NextFunction} from "express";

interface CustomRequest extends Request {
  currentUser: Object;
}

async function decodeJWT(request: CustomRequest, _response: Response, next: NextFunction) {
  if (request.headers.authorization && request.headers.authorization.startsWith("Bearer ")) {
    const idToken = request.headers.authorization.split("Bearer ")[1];
    // console.log("request.headers.authorization:", request.headers.authorization);
    // console.log({idToken});

    try {
      const decodedToken = await firebase.auth.verifyIdToken(idToken);
      request["currentUser"] = decodedToken;
      // console.log("request['currentUser']:", request["currentUser"]);
      // console.log({decodedToken});
    } catch (error) {
      console.log({error});
    }
  }

  next();
}

module.exports = decodeJWT;
