import jwt from "jsonwebtoken";
import User from "../models/users/User.js";
const secret = process.env.SECRET;

export const middlewaresAuth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({
        status: false,
        message: "Not authorized",
      });
    }
    req.token = authorization.split(" ")[1];
    const userDetailsFromToken = jwt.verify(req.token, secret);
    const user = await User.findById(userDetailsFromToken.id);
    if (!user || !user.token || user.token !== req.token) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized",
      });
    }
    req.user = user;

    next();
  } catch (error) {
    error.source = "jwt middleware error";
    next(error);
  }
};
