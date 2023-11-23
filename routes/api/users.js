import express from "express";
import authRouter, {
  getCurrentUser,
  logoutUser,
  updateAvatar,
} from "../../controllers/users/authRouter.js";
import { middlewaresAuth } from "../../middlewares/middlewaresAuth.js";
import { middlewareUploadAvatar } from "../../middlewares/middlewareUploadAvatar.js";

const router = express.Router();

router.use("/", authRouter);

router.post("/logout", middlewaresAuth, logoutUser);

router.get("/current", middlewaresAuth, getCurrentUser);

router.patch("/avatars", middlewaresAuth, middlewareUploadAvatar, updateAvatar);

export default router;
