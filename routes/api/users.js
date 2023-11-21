import express from "express";
import authRouter, {
  getCurrentUser,
  logoutUser,
} from "../../controllers/users/authRouter.js";
import { middlewaresAuth } from "../../middlewares/middlewaresAuth.js";

const router = express.Router();

router.use("/", authRouter);

router.post("/logout", middlewaresAuth, logoutUser);

router.get("/current", middlewaresAuth, getCurrentUser);

export default router;
