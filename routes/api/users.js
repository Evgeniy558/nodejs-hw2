import express from "express";
import authRouter from "../../controllers/users/authRouter.js";
import { middlewaresAuth } from "../../middlewares/middlewaresAuth.js";
import { middlewareUploadAvatar } from "../../middlewares/middlewareUploadAvatar.js";
import { logoutUser } from "../../controllers/users/logoutUser.js";
import { getCurrentUser } from "../../controllers/users/getCurrentUser.js";
import { updateAvatar } from "../../controllers/users/updateAvatar.js";

const router = express.Router();

router.use("/", authRouter);

router.post("/logout", middlewaresAuth, logoutUser);

router.get("/current", middlewaresAuth, getCurrentUser);

router.patch("/avatars", middlewaresAuth, middlewareUploadAvatar, updateAvatar);

export default router;
