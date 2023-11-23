import express from "express";
import jwt from "jsonwebtoken";
import User from "../../models/users/User.js";
import Joi from "joi";
import Jimp from "jimp";
import "dotenv/config";
import { getUserbyId } from "../../models/users/users.js";
import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises";
const authRouter = express.Router();
const secret = process.env.SECRET;

const schemaIsRequired = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

authRouter.post("/signup", async (req, res, next) => {
  const result = schemaIsRequired.validate(req.body);
  if (result.error) {
    res.status(400).json({ massege: result.error.message });
  } else {
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
});

authRouter.post("/login", async (req, res) => {
  const result = schemaIsRequired.validate(req.body);
  if (result.error) {
    res.status(400).json({ massege: result.error.message });
  } else {
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
  }
});
export default authRouter;

export const logoutUser = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const user = await getUserbyId(_id);

    if (!user) {
      return res.status(404).json("Error! User not found!");
    }
    user.token = null;

    await user.save();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "An error occurred during logout.",
    });
  }
};

export const getCurrentUser = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await getUserbyId(userId);
    if (!user) {
      return res.status(404).json("Error! User not found!");
    }
    const { email, subscription } = user;
    return res.status(200).json({
      status: "success",
      code: 200,
      data: { email, subscription },
    });
  } catch (err) {
    res.status(500).json("An error occurred while getting the contact: ${err}");
  }
};

export const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }
  const { path: tmpPath, originalname } = req.file;
  await Jimp.read(tmpPath)
    .then((avatar) => {
      return avatar.resize(250, 250).quality(60).write(tmpPath);
    })
    .catch((e) => {
      console.log(e);
    });
  const fileName = `${req.user._id}_${originalname}`;
  const uplodedFile = path.join(process.cwd(), "public", "avatars", fileName);
  await fs.rename(tmpPath, uplodedFile);
  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(req.user._id, { avatarURL });
  res.status(200).json({
    avatarURL,
  });
};
