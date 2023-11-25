import express from "express";
import jwt from "jsonwebtoken";
import User from "../../models/users/User.js";
import "dotenv/config";
import gravatar from "gravatar";
const authRouter = express.Router();
const secret = process.env.SECRET;
import { schemaIsRequired } from "../../validators/users/signupValidator.js";
import { bodyValidate } from "../../middlewares/validate.js";

authRouter.post(
  "/signup",
  bodyValidate(schemaIsRequired),
  async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).lean();
    if (user) {
      return res.status(409).json({ message: "Email in use" });
    }
    try {
      const avatarURL = gravatar.url(email);
      const newUser = new User({ email, avatarURL });
      await newUser.setPassword(password);
      await newUser.save();
      res.status(201).json({
        user: {
          email: email,
          subscription: "starter",
          avatarURL,
        },
      });
    } catch (e) {
      res.status(500).json(e);
    }
  }
);

authRouter.post("/login", bodyValidate(schemaIsRequired), async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "no such user" });
  }
  const isPasswordCorrect = await user.validatePassword(password);
  if (isPasswordCorrect) {
    //token
    const payload = {
      id: user._id,
      email: user.email,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "24h" });
    user.token = token;
    await user.save();
    return res.json({
      data: {
        token,
        user: {
          email: email,
          subscription: "starter",
        },
      },
    });
  } else {
    return res.status(401).json({ message: "wrong password" });
  }
});
export default authRouter;
