import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse.js";

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //barer Token
    if (!token) {
      return next(ErrorResponse("un-authorized"));
    }

    jwt.verify(token, process.env.JWT_SECREET, (err, decoded) => {
      if (err) {
        return next(ErrorResponse("un-authorized"));
      }
      req.user = {
        ...decoded,
      };

      next();
    });
  } catch (error) {
    return next(ErrorResponse("un-authorized"));
  }
};
