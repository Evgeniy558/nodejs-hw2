import User from "../../models/users/User.js";

export const verify = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: " ",
    });
    res.status(200).json({
      message: "Verification successful",
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};
