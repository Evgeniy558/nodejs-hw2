import User from "../../models/users/User.js";
import { sendEmail } from "../../models/users/sendMail.js";

export const reVerify = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
    if (user.verify)
      return res.status(400).json({
        status: false,
        message: "Verification has already been passed",
      });
    await sendEmail(email, user.verificationToken);
    res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
